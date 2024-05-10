import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Store } from '@ngrx/store';
import { CurrencyDataInterface, TripInterface } from '../../../models';
import {
  addTrip,
  deleteTrip,
  editTrip,
} from '../../../store/actions/trip.actions';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { matSettings, matAdd } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TripState } from '../../../store/state';
import { selectSelectedTrip, selectUser } from '../../../store/selectors';
import currencies from '../../../../assets/json/currencies.json';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [
    NzFormModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzSpaceModule,
    NgIconComponent,
    NzPopconfirmModule,
    NzSelectModule,
  ],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
  viewProviders: [provideIcons({ matSettings, matAdd })],
})
export class AddTripFormComponent implements OnInit {
  @Input() edit = false;
  @Output() closeDrawer = new EventEmitter<void>();

  dateFormat = 'yyyy/MM/dd';
  visible = false;
  title = 'Create a Trip';
  buttonText = 'Add Trip';
  selectedTrip$ = this.store.select(selectSelectedTrip);
  userId$ = this.store.select(selectUser);
  trip: TripInterface | undefined;

  currencies: CurrencyDataInterface[] = Object.values(currencies);

  validateForm: FormGroup<{
    tripName: FormControl<string>;
    tripDestination: FormControl<string>;
    tripDates: FormControl<[Date, Date] | null>;
    homeCurrency: FormControl<string>;
    destinationCurrency: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<TripState>,
    private nzMessageService: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      tripName: ['', [Validators.required]],
      tripDestination: ['', [Validators.required]],
      tripDates: this.fb.control<[Date, Date] | null>(null, {
        validators: [Validators.required],
      }),
      homeCurrency: ['', [Validators.required]],
      destinationCurrency: ['', [Validators.required]],
    });

    this.selectedTrip$.pipe(takeUntilDestroyed()).subscribe((trip) => {
      if (trip) {
        this.trip = trip;
        this.populateForm(trip);
      }
    });
  }

  ngOnInit(): void {
    if (this.edit) {
      this.title = 'Edit Trip';
      this.buttonText = 'Save Changes ';
    }

  }

  populateForm(trip: TripInterface): void {
    this.validateForm.patchValue({
      tripName: trip.name,
      tripDestination: trip.destination,
      tripDates: [trip.startDate, trip.endDate],
    });
  }

  addTrip(): void {
    if (this.validateForm.valid) {
      const homeCurrency = this.currencies.find(
        (currency) => currency['code'] === this.validateForm.value.homeCurrency
      );
      const homeCurrencySymbol = homeCurrency ? homeCurrency['symbol'] : '';

      const destinationCurrency = this.currencies.find(
        (currency) =>
          currency['code'] === this.validateForm.value.destinationCurrency
      );
      const destinationCurrencySymbol = destinationCurrency
        ? destinationCurrency['symbol']
        : '';

      const newTrip: TripInterface = {
        name: this.validateForm.value.tripName ?? '',
        destination: this.validateForm.value.tripDestination ?? '',
        startDate: this.validateForm.value.tripDates
          ? this.validateForm.value.tripDates[0]
          : new Date(),
        endDate: this.validateForm.value.tripDates
          ? this.validateForm.value.tripDates[1]
          : new Date(),
        homeCurrency: this.validateForm.value.homeCurrency ?? '',
        homeCurrencySymbol: homeCurrencySymbol,
        destinationCurrency: this.validateForm.value.destinationCurrency ?? '',
        destinationCurrencySymbol: destinationCurrencySymbol,
      };

      const action = this.edit
        ? editTrip({ updatedTrip: newTrip })
        : addTrip({ newTrip });
      this.store.dispatch(action);
      this.close();
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  showDrawer(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit();
  }

  deleteTrip(tripId: string): void {
    this.store.dispatch(deleteTrip({ tripId }));
    this.nzMessageService.info('Trip deleted');
  }
}
