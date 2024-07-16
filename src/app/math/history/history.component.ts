import {Component, OnDestroy, OnInit} from '@angular/core';
import {HistoryService} from "../shared/services/history.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {provideRouter, RouterLink, RouterOutlet} from "@angular/router";
import {OperationSearchPipe} from "../shared/pipes/operationSearch.pipe";
import {FormsModule} from "@angular/forms";
import {TimeSearchPipe} from "../shared/pipes/timeSearch.pipe";
import {TranslatePipe} from "../shared/pipes/translate.pipe";
import {delay, Subscription} from "rxjs";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
    RouterOutlet,
    NgIf,
    FormsModule,
    OperationSearchPipe,
    TimeSearchPipe,
    TranslatePipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit, OnDestroy{
  exercises!: any
  operation: string = 'allOperation';
  time: string = 'allTime';
  sub1!: Subscription
  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadHistory()
  }

  loadHistory() {
    this.exercises = []
    this.sub1 = this.historyService.getExamples()
      .pipe(delay(1500))
      .subscribe(response => {
        // console.log('History: ', response)
        this.exercises = response
        // console.log('history: ',this.exercises)
      })
  }

  removeExercise(id: string) {
    this.historyService.remove(id).subscribe(() => {
      this.exercises = this.exercises.filter((exercise: any) => exercise.id !== id)
    })
  }

  ngOnDestroy(){
    if (this.sub1){
      this.sub1.unsubscribe()
    }
  }

  protected readonly provideRouter = provideRouter;
}
