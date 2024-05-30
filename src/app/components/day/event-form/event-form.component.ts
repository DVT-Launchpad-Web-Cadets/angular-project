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
import { TagType } from '../../../models';
import { EventState, TripState } from '../../../store/state';
import { selectCurrencyInfo, selectEvents } from '../../../store/selectors';
import { AsyncPipe } from '@angular/common';

import { LocationAutoCompleteComponent, PlaceSearchResult } from "../../shared/location-auto-complete/location-auto-complete.component";

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
        AsyncPipe,
        LocationAutoCompleteComponent
    ]
})
export class EventFormComponent implements OnInit {
  @Input() editMode = true;
  @Input() eventInput: EventInterface | undefined = undefined;
  @Input() edit = false;
  @Input() date: string | undefined = undefined;
  @Output() closeDrawer = new EventEmitter<void>();

  selectedEvent$ = this.eventStore.select(selectEvents);
  selectedCurrencyInfo$ = this.tripStore.select(selectCurrencyInfo);

  visible = false;
  title = 'Create an Event';
  buttonText = 'Add Event';
  tripId = '';

  formValue: PlaceSearchResult | undefined;

  options: { value: TagType }[] = [
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

  validateForm: FormGroup<{
    eventName: FormControl<string>;
    eventStartTime: FormControl<Date | null>;
    eventEndTime: FormControl<Date | null>;
    eventTag: FormControl<string>;
    eventNotes: FormControl<string>;
    eventLatitude: FormControl<string>;
    eventLongitude: FormControl<string>;
    eventCost: FormControl<number>;
    eventCurrency: FormControl<string>;
  }>;

    destination =  'Sundown Restaurant';

  constructor(
    private fb: NonNullableFormBuilder,
    private eventStore: Store<EventState>,
    private tripStore: Store<TripState>,
    private route: ActivatedRoute
  ) {
    this.validateForm = this.fb.group({
      eventName: [this.eventInput?.name ?? '', [Validators.required]],
      eventStartTime: this.fb.control<Date | null>(
        this.eventInput?.startTime ?? null
      ),
      eventEndTime: this.fb.control<Date | null>(
        this.eventInput?.endTime ?? null
      ),
      eventTag: ['Other', [Validators.required]],
      eventNotes: [''],
      eventLatitude: [''],
      eventLongitude: [''],
      eventCost: [0],
      eventCurrency: ['R'],
    });
  }

  ngOnInit(): void {
    if (this.edit) {
      this.title = 'Edit Event';
      this.buttonText = 'Edit Event';
    }
    this.tripId = this.route.snapshot.params['tripId'];
    if (this.editMode && this.eventInput) this.populateForm(this.eventInput);
  }

  populateForm(event: EventInterface): void {
    this.validateForm.patchValue({
      eventName: event.name,
      eventStartTime: event.startTime,
      eventEndTime: event.endTime,
      eventTag: event.tag,
      eventNotes: event.notes,
      eventCost: event.cost,
      eventCurrency: event.currency,
    });
    this.destination = event.location ?? '';
  }

  addEvent(): void {
    if (this.validateForm.valid) {
      const newEvent: EventInterface = this.createEventObject();
      if (this.edit) {
        this.eventStore.dispatch(editEvent({ updatedEvent: newEvent }));
      } else {
        this.eventStore.dispatch(addEvent({ newEvent }));
      }
      this.validateForm.reset();
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

  private createEventObject(): EventInterface {
    let newEvent : EventInterface = {
      name: this.validateForm.value.eventName ?? '',
      tripId: this.tripId,
      date: this.date ?? '',
      startTime: this.validateForm.value.eventStartTime ?? new Date(),
      endTime: this.validateForm.value.eventEndTime ?? new Date(),
      tag: this.validateForm.value.eventTag ?? 'Other',
      notes: this.validateForm.value.eventNotes,
      locationUrl: this.formValue?.url ?? this.eventInput?.locationUrl,
      location: this.formValue?.address,
      latitude: this.formValue?.location?.lat(),
      longitude: this.formValue?.location?.lng(),
      cost: this.validateForm.value.eventCost ?? 0,
      currency: this.validateForm.value.eventCurrency,
    };

    if (this.editMode && this.eventInput) {
      newEvent = {...newEvent, id: this.eventInput.id};
    }
    return newEvent;

  }
}
