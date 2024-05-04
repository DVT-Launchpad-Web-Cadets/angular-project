import { Component } from '@angular/core';
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
import { addTrip } from '../../store/actions/tripActions';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [NzFormModule, FormsModule, NzDatePickerModule, ReactiveFormsModule],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
})
export class AddTripFormComponent {
  dateFormat = 'yyyy/MM/dd';
  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>
  ) {}

  validateForm: FormGroup<{
    tripName: FormControl<string>;
    tripDestination: FormControl<string>;
    tripDates: FormControl<[Date, Date] | null>;
  }> = this.fb.group({
    tripName: ['', [Validators.required]],
    tripDestination: ['', [Validators.required]],
    tripDates: this.fb.control<[Date, Date] | null>(null),
  });

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
      this.store.dispatch(addTrip({ newTrip }));
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
