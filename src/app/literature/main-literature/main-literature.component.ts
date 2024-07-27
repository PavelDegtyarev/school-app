import { Component } from '@angular/core'
import {RouterLink, RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-main-literature',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './main-literature.component.html',
  styleUrl: './main-literature.component.css'
})
export class MainLiteratureComponent {

}
