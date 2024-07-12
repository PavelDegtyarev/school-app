import {Component, OnInit} from '@angular/core';
import {Examples, HistoryService} from "../services/history.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {OperationSearchPipe} from "../pipes/operationSearch.pipe";
import {FormsModule} from "@angular/forms";
import {TimeSearchPipe} from "../pipes/timeSearch.pipe";

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
    TimeSearchPipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{
  exercises!: any
  operation: string = '';
  time: string = '';
  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadHistory()
  }

  loadHistory() {
    this.exercises = []
    this.historyService.getExamples()
      .subscribe(response => {
        // console.log('History: ', response)
        this.exercises = response
        console.log('history: ',this.exercises)
      })
  }

  removeExercise(id: string) {
    this.historyService.remove(id).subscribe(() => {
      this.exercises = this.exercises.filter((exercise: any) => exercise.id !== id)
    })
  }
}
