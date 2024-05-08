import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
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
import { addEvent, editEvent } from '../../../store/actions/event.actions';
import { EventInterface } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { TagComponent } from '../../shared/tag/tag.component';
import { Tag } from '../../../models';
import { EventState } from '../../../store/state';
import { selectEvents } from '../../../store/selectors';

@Component({
  selector: 'app-event-form',
  standalone: true,
  viewProviders: [provideIcons({ matEdit, matAdd })],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
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
    TagComponent,
  ],
})
export class EventFormComponent implements OnInit {
  @Input() editMode = true;
  @Input() eventInput: EventInterface | undefined = undefined;
  @Input() edit = false;
  @Input() date: string | undefined = undefined;
  @Output() closeDrawer = new EventEmitter<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<EventState>,
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

  visible = false;
  title = 'Create a Trip';
  buttonText = 'Add Trip';

  tripId = '';

  validateForm: FormGroup<{
    eventName: FormControl<string>;
    eventStartTime: FormControl<Date | null>;
    eventEndTime: FormControl<Date | null>;
    eventTags: FormControl<any>; // struggling to get this to work
    eventNotes: FormControl<string>;
    locationUrl: FormControl<string>;
    eventLatitude: FormControl<string>;
    eventLongitude: FormControl<string>;
    eventCost: FormControl<number>;
    eventCurrency: FormControl<string>;
  }> = this.fb.group({
    eventName: [this.eventInput?.name ?? '', [Validators.required]],
    eventStartTime: this.fb.control<Date | null>(
      this.eventInput?.startTime ?? null
    ),
    eventEndTime: this.fb.control<Date | null>(
      this.eventInput?.endTime ?? null
    ),
    eventTags: [this.eventInput?.tag ?? 'Other', [Validators.required]],
    eventNotes: [this.eventInput?.notes ?? ''],
    locationUrl: [this.eventInput?.locationUrl ?? '', [Validators.required]],
    eventLatitude: [this.eventInput?.latitude ?? ''],
    eventLongitude: [this.eventInput?.longitude ?? ''],
    eventCost: [this.eventInput?.cost ?? 0, [Validators.required]],
    eventCurrency: [this.eventInput?.currency ?? 'R', [Validators.required]],
  });

  addEvent(): void {
    if (this.validateForm.valid) {
      const newEvent: EventInterface = {
        name: this.validateForm.value.eventName ?? '',
        tripId: this.tripId,
        date: this.date ?? '',
        startTime: this.validateForm.value.eventStartTime ?? new Date(),
        endTime: this.validateForm.value.eventEndTime ?? new Date(),
        tag: this.validateForm.value.eventTags ?? 'Other',
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

  options: { value: Tag }[] = [
    { value: 'Food' },
    { value: 'Transport' },
    { value: 'Lodging' },
    { value: 'Activity' },
    { value: 'Historical' },
    { value: 'Shopping' },
    { value: 'Flight' },
    { value: 'Coffee' },
    { value: 'Entertainment' },
    { value: 'Other' },
  ];
}
