import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducer';
import { getTrips } from '../../store/actions/tripActions';
import { selectTrips } from '../../store/selectors/selectors';
import { AsyncPipe } from '@angular/common';
import { EventComponent } from '../event/event.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  matEdit,
  matLocationOn,
  matAdd,
} from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-itenary',
  standalone: true,
  imports: [
    AsyncPipe,
    EventComponent,
    NzTabsModule,
    NzRadioModule,
    NzInputNumberModule,
    NgIconComponent,
  ],
  templateUrl: './itenary.component.html',
  styleUrl: './itenary.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
})
export class ItenaryComponent {
  selectedTrips$ = this.store.select(selectTrips);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getTrips());
  }
}
