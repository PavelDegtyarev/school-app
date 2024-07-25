import {AfterContentChecked, Component, inject, OnChanges, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MathComponent} from "../math/math.component";
import {AuthService} from "../shared/services/auth.service";
import {HistoryService} from "../math/shared/services/history.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MathComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterContentChecked{
  authService = inject(AuthService)
  historyService = inject(HistoryService)
  ngOnInit() {

  }

  ngAfterContentChecked(){
    // this.authService.getUserData()
    // this.historyService.userName = localStorage.getItem('displayName')
    // console.log('HomePage: ', this.historyService.userName)

  }

}
