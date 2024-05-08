import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/tripReducers';
import { TripInterface } from '../../models';
import { addTrip, deleteTrip, editTrip } from '../../store/actions/tripActions';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { matSettings, matAdd } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  selectSelectedTrip,
  selectUser,
} from '../../store/selectors/selectors';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [
    NzFormModule,
    FormsModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzSpaceModule,
    NgIconComponent,
    NzPopconfirmModule
  ],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
  viewProviders: [provideIcons({ matSettings, matAdd })],
})
export class AddTripFormComponent implements OnInit {
  dateFormat = 'yyyy/MM/dd';
  @Input() edit = false;
  @Output() closeDrawer = new EventEmitter<void>();

  visible = false;
  title = 'Create a Trip';
  buttonText = 'Add Trip';

  selectedTrip$ = this.store.select(selectSelectedTrip);
  userId$ = this.store.select(selectUser);

  tripName = '';
  tripDestination = '';
  tripDates: [Date, Date] | null = null;

  trip: TripInterface | undefined = undefined;

  validateForm: FormGroup<{
    tripName: FormControl<string>;
    tripDestination: FormControl<string>;
    tripDates: FormControl<[Date, Date] | null>;
  }> = this.fb.group({
    tripName: [this.trip?.name ?? '', [Validators.required]],
    tripDestination: [this.trip?.destination ?? '', [Validators.required]],
    tripDates: this.fb.control<[Date, Date] | null>(this.tripDates, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.edit) {
      this.title = 'Edit Trip';
      this.buttonText = 'Edit Trip';
    }

    this.selectedTrip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
      }
    });
  }

  addTrip(): void {
    if (this.validateForm.valid) {
      const newTrip: TripInterface = {
        name: this.validateForm.value.tripName ?? '',
        destination: this.validateForm.value.tripDestination ?? '',
        startDate: this.validateForm.value.tripDates
          ? this.validateForm.value.tripDates[0]
          : new Date(),
        endDate: this.validateForm.value.tripDates
          ? this.validateForm.value.tripDates[1]
          : new Date(),
      };
      if (this.edit) {
        this.store.dispatch(editTrip({ updatedTrip: newTrip }));
      } else {
        this.store.dispatch(addTrip({ newTrip }));
      }
      this.close();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showDrawer() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.closeDrawer.emit();
  }

  deleteTrip(tripId: string) {
    this.store.dispatch(deleteTrip({ tripId }));
    this.nzMessageService.info('trip deleted');
  }
}
