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


  ngOnInit(): void {
    this.itenaryFirebaseService.getItenaries().subscribe((itenaries) => {
      console.log(itenaries);
    });
  }
}
