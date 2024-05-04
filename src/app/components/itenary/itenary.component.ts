import { Component, OnInit, inject } from '@angular/core';
import { ItenaryService } from '../../services/itenary.service';
import { ItenaryFirebaseService } from '../../services/itenary-firebase.service';
import { EventComponent } from '../event/event.component';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';
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
  templateUrl: './itenary.component.html',
  styleUrl: './itenary.component.css',
  viewProviders: [provideIcons({ matEdit, matLocationOn, matAdd })],
  imports: [
    EventComponent,
    NzTabsModule,
    NzRadioModule,
    NzInputNumberModule,
    NgIconComponent,
  ],
})
export class ItenaryComponent{
  itenaryService = inject(ItenaryService);
  itenaryFirebaseService = inject(ItenaryFirebaseService);
  location = 'Add location';
}
