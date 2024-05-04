import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-add-itenary-item-form',
  standalone: true,
  imports: [
    NzFormModule,
    FormsModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzSelectModule,
    NzSpaceModule,
    NzTimePickerModule,
    NzInputModule,
  ],
  templateUrl: './add-itenary-item-form.component.html',
  styleUrl: './add-itenary-item-form.component.css',
})
export class AddItenaryItemFormComponent {
  constructor(private fb: NonNullableFormBuilder) {}

  validateForm: FormGroup<{
    eventName: FormControl<string>;
    eventStartTime: FormControl<Date | null>;
    eventEndTime: FormControl<Date | null>;
    eventTags: FormControl<string>;
    eventNotes: FormControl<string>;
    locationUrl: FormControl<string>;
    eventLatitude: FormControl<string>;
    eventLongitude: FormControl<string>;
    eventCost: FormControl<number>;
    eventCurrency: FormControl<string>;
  }> = this.fb.group({
    eventName: ['', [Validators.required]],
    eventStartTime: this.fb.control<Date | null>(null),
    eventEndTime:  this.fb.control<Date | null>(null),
    eventTags: [''],
    eventNotes: [''],
    locationUrl: ['', [Validators.required]],
    eventLatitude: [''],
    eventLongitude: [''],
    eventCost: [0, [Validators.required]],
    eventCurrency: ['R', [Validators.required]],
  });

  addEvent(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        console.log(control);
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
