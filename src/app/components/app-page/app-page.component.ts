import { Component } from '@angular/core';
import { SignupButtonComponent } from "../shared/signup-button/signup-button.component";

@Component({
    selector: 'app-app-page',
    standalone: true,
    templateUrl: './app-page.component.html',
    styleUrl: './app-page.component.css',
    imports: [SignupButtonComponent]
})
export class AppPageComponent {

}
