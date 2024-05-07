import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matEdit, matAdd } from '@ng-icons/material-icons/baseline';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/tripReducers';
import { addEvent, editEvent } from '../../../store/actions/eventActions';
import { EventInterface } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { selectEvents } from '../../../store/selectors/selectors';

@Component({
  selector: 'app-event-form',
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
    NzDrawerModule,
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ matEdit, matAdd })],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  selectedEvent$ = this.store.select(selectEvents);

  ngOnInit(): void {
    if (this.edit) {
      this.title = 'Edit Trip';
      this.buttonText = 'Edit Trip';
    }

    this.tripId = this.route.snapshot.params['tripId'];
  }
  @Input() edit = false;
  @Input() date: string | undefined = undefined;
  @Output() closeDrawer = new EventEmitter<void>();

  visible = false;
  title = 'Create a Trip';
  buttonText = 'Add Trip';

  tripId = '';

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
    eventEndTime: this.fb.control<Date | null>(null),
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
      console.log(this.validateForm.value);
      const newEvent: EventInterface = {
        name: this.validateForm.value.eventName ?? '',
        tripId: this.tripId,
        date: this.date ?? '',
        startTime: this.validateForm.value.eventStartTime ?? new Date(),
        endTime: this.validateForm.value.eventEndTime ?? new Date(),
        tag: 'Activity',
        notes: this.validateForm.value.eventNotes,
        locationUrl: this.validateForm.value.locationUrl,
        latitude: this.validateForm.value.eventLatitude,
        longitude: this.validateForm.value.eventLongitude,
        cost: this.validateForm.value.eventCost ?? 0,
        currency: this.validateForm.value.eventCurrency,
      };
      if (this.edit) {
        this.store.dispatch(editEvent({ updatedEvent: newEvent }));
      } else {
        this.store.dispatch(addEvent({ newEvent }));
        console.log('dispatched');
      }
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

  showDrawer() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.closeDrawer.emit();
  }
}
