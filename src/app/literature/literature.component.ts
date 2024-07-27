import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-literature',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './literature.component.html',
  styleUrl: './literature.component.css'
})
export class LiteratureComponent {

}
