import { Component } from '@angular/core';
import { TagComponent } from "../tag/tag.component";

@Component({
    selector: 'app-tag-form',
    standalone: true,
    templateUrl: './tag-form.component.html',
    styleUrl: './tag-form.component.css',
    imports: [TagComponent]
})
export class TagFormComponent {

}
