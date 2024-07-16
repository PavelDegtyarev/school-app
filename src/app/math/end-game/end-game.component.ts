import {AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MultGameComponent} from "../mult-game/mult-game.component";
import {NgForOf} from "@angular/common";
import {SaveResultsService} from "../shared/services/save-results.service";
import {HistoryService} from "../shared/services/history.service";
import {Exercise} from "../shared/interfaces";

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent implements OnInit{

  constructor(
    public saveResults: SaveResultsService,
    private historyService: HistoryService
  ) {}

  @Output() closeEndGame = new EventEmitter()

  // arrayResults: Array<{text: string, answer: number, studentAnswer: number, right: boolean}> = []
  // arrayResults: Examples[] = []
  arrayResults!: Exercise

  ngOnInit(){
    this.arrayResults = this.saveResults.saveResult
    this.historyService.addExamples(this.arrayResults)
      .subscribe()
  }

  close() {
    this.closeEndGame.emit()
    // this.saveResults.saveResult = {
    //   items: [],
    // }
    this.saveResults.saveResult.items = []

  }
}
