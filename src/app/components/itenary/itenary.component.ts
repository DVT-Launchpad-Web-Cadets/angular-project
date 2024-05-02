import { Component, OnInit, inject } from '@angular/core';
import { ItenaryService } from '../../services/itenary.service';
import { ItenaryFirebaseService } from '../../services/itenary-firebase.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducer';
import { getTrips } from '../../store/actions/actions';
import { selectTrips } from '../../store/selectors/selectors';
import { AsyncPipe } from '@angular/common';
import { TripFirebaseService } from '../../services/trip-firebase.service';

@Component({
  selector: 'app-itenary',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './itenary.component.html',
  styleUrl: './itenary.component.css',
})
export class ItenaryComponent implements OnInit {
  itenaryService = inject(ItenaryService);
  itenaryFirebaseService = inject(ItenaryFirebaseService);

  tripFirebaseService = inject(TripFirebaseService);

  selectedTrips$ = this.store.select(selectTrips);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getTrips());
  }

  ngOnInit(): void {
    this.itenaryFirebaseService.getItenaries().subscribe((itenaries) => {
      console.log(itenaries);
    });
    // this.tripFirebaseService.getTrips().subscribe((trips) => {
    //   console.log(trips);
    // });
  }
}
