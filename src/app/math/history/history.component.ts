import { Component } from '@angular/core';
import {Examples, HistoryService} from "../services/history.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  array!: any
  constructor(private historyService: HistoryService) {}

  loadHistory() {
    this.array = []
    this.historyService.getExamples()
      .subscribe(response => {
        // console.log('History: ', response)
        this.array = response
        console.log('history: ',this.array)
      })
  }
}
