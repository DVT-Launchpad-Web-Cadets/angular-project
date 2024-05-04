import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducer';
import { getTrips } from '../../store/actions/actions';
import { selectTrips } from '../../store/selectors/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-itenary',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './itenary.component.html',
  styleUrl: './itenary.component.css',
})
export class ItenaryComponent {
  selectedTrips$ = this.store.select(selectTrips);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getTrips());
  }
}
