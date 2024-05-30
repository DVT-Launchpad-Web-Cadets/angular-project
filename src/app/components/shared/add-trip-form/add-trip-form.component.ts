import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
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
import {
  matSettings,
  matAdd,
  matDelete,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TripState } from '../../../store/state';
import { selectSelectedTrip, selectUser } from '../../../store/selectors';
import currencies from '../../../../assets/json/currencies.json';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  LocationAutoCompleteComponent,
  PlaceSearchResult,
} from '../location-auto-complete/location-auto-complete.component';
import { Router } from '@angular/router';
import { featherEdit } from '@ng-icons/feather-icons';
import { remixEditBoxLine } from '@ng-icons/remixicon';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
  viewProviders: [
    provideIcons({
      matSettings,
      matAdd,
      matDelete,
      featherEdit,
      remixEditBoxLine,
    }),
  ],
  imports: [
    NzFormModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzSpaceModule,
    NgIconComponent,
    NzPopconfirmModule,
    NzSelectModule,
    NzModalModule,
    LocationAutoCompleteComponent,
  ],
})
export class AddTripFormComponent implements OnInit {
  router = inject(Router);
  destination = 'e.g Greece';

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

  fromValue: PlaceSearchResult | undefined;

  validateForm: FormGroup<{
    tripName: FormControl<string>;
    tripDestination: FormControl<string>;
    startDate: FormControl<Date | null>;
    endDate: FormControl<Date | null>;
    homeCurrency: FormControl<string>;
    destinationCurrency: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<TripState>,
    private nzMessageService: NzMessageService,
    private modal: NzModalService
  ) {
    this.validateForm = this.fb.group({
      tripName: ['', [Validators.required]],
      tripDestination: [''],
      startDate: this.fb.control<Date | null>(null, {
        validators: [Validators.required],
      }),
      endDate: this.fb.control<Date | null>(null, {
        validators: [Validators.required],
      }),
      homeCurrency: ['', [Validators.required]],
      destinationCurrency: ['', [Validators.required]],
    });

    this.selectedTrip$.pipe(takeUntilDestroyed()).subscribe((trip) => {
      if (trip && this.edit) {
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
      startDate: trip.startDate,
      endDate: trip.endDate,
      homeCurrency: trip.homeCurrency,
      destinationCurrency: trip.destinationCurrency,
    });

    this.destination = trip.destination;
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

      let newTrip: TripInterface = {
        name: this.validateForm.value.tripName ?? '',
        destination: this.fromValue?.address ?? '',
        startDate: this.validateForm.value.startDate ?? new Date(),
        endDate: this.validateForm.value.endDate ?? new Date(),
        homeCurrency: this.validateForm.value.homeCurrency ?? '',
        homeCurrencySymbol: homeCurrencySymbol,
        destinationCurrency: this.validateForm.value.destinationCurrency ?? '',
        destinationCurrencySymbol: destinationCurrencySymbol,
        imageUrl: this.fromValue?.imageUrl,
      };

      if (this.edit) {
        newTrip = {
          ...newTrip,
          id: this.trip?.id,
          userId: this.trip?.userId,
        };
      }

      const action = this.edit
        ? editTrip({ updatedTrip: newTrip })
        : addTrip({ newTrip });
      this.store.dispatch(action);
      this.close();
      this.validateForm.reset();
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
    this.close();
    this.router.navigate(['/my-trips']);
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this trip?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTrip(this.trip?.id ?? ''),
      nzCancelText: 'No',
    });
  }
}
