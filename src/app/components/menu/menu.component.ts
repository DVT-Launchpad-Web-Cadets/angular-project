import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ItenaryComponent } from '../itenary/itenary.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NzTabsModule, NzButtonModule, ItenaryComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
