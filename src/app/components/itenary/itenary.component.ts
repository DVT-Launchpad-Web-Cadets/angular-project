import { Component, OnInit, inject } from '@angular/core';
import { ItenaryService } from '../../services/itenary.service';
import { ItenaryFirebaseService } from '../../services/itenary-firebase.service';
import { DayComponent } from "./day/day.component";
import { EventComponent } from "../event/event.component";
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';


@Component({
    selector: 'app-itenary',
    standalone: true,
    templateUrl: './itenary.component.html',
    styleUrl: './itenary.component.css',
    imports: [DayComponent, EventComponent, NzTabsModule, NzRadioModule, NzInputNumberModule]
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

    for (let i = 0; i < 30; i++) {
      this.tabs.push({
        name: `Tab ${i}`,
        disabled: i === 28,
        content: `Content of tab ${i}`
      });
    }
  }

  tabs: Array<{ name: string; content: string; disabled: boolean }> = [{name: "name", content: "content", disabled: false}
  ];
  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 27;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {
    console.log(args);
  }

}
