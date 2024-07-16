import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import { HistoryService} from "../shared/services/history.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {delay, Subscription, switchMap} from "rxjs";
import {HistoryComponent} from "../history/history.component";
import {TranslatePipe} from "../shared/pipes/translate.pipe";
import {Exercise} from "../shared/interfaces";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    TranslatePipe,
    DatePipe,
    NgIf,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit, OnDestroy{

  exercise!: Exercise
  sub1!: Subscription
  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub1 = this.route.params.pipe(
      delay(1500),
      switchMap((params: Params) => {
        return this.historyService.getExampleById(params['id'])
      })
    )
      .subscribe((response) => {
      this.exercise = response
      console.log('Response: ',response)
      // console.log('Response: ',this.exercise.id)
      // console.log(this.historyService.getExample(params['id']))
    })
  }

  removeExercise(id: string) {
    this.historyService.remove(id).subscribe(() => {
      // console.log('remove')
      this.router.navigate(['/math', 'history'])
    })

  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe()
    }
  }
}
