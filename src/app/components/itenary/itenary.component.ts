import { Component, OnInit, inject } from '@angular/core';
import { ItenaryService } from '../../services/itenary.service';
import { ItenaryFirebaseService } from '../../services/itenary-firebase.service';
import { DayComponent } from "./day/day.component";

@Component({
    selector: 'app-itenary',
    standalone: true,
    templateUrl: './itenary.component.html',
    styleUrl: './itenary.component.css',
    imports: [DayComponent]
})
export class ItenaryComponent implements OnInit {
  itenaryService = inject(ItenaryService);
  itenaryFirebaseService = inject(ItenaryFirebaseService);

  days = [
    { id: '1', name: 'Day 1', location: 'Scotland', currency: 'R', cost: '100' },
    { id: '1', name: 'Day 2', location: 'Livingston', currency:'$', cost: '3000' },
  ];

  ngOnInit(): void {
    this.itenaryFirebaseService.getItenaries().subscribe((itenaries) => {
      console.log(itenaries);
    });
  }
}
