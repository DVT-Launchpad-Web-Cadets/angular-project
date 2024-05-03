import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [NzFormModule, FormsModule, NzDatePickerModule, ReactiveFormsModule],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
})
export class AddTripFormComponent {
  dateFormat = 'yyyy/MM/dd';
  constructor(private fb: NonNullableFormBuilder) {}

  validateForm: FormGroup<{
    tripName: FormControl<string>;
    tripDestination: FormControl<string>;
    tripDates: FormControl<[Date, Date] | null>;
  }> = this.fb.group({
    tripName: ['', [Validators.required]],
    tripDestination: ['', [Validators.required]],
    tripDates: this.fb.control<[Date, Date] | null>(null),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      console.log('invalid form');
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
