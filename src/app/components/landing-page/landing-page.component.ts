import { Component } from '@angular/core';
import { SignupButtonComponent } from "../shared/signup-button/signup-button.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SignupButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
