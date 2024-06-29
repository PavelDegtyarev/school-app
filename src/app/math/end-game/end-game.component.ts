import {AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MultGameComponent} from "../mult-game/mult-game.component";
import {NgForOf} from "@angular/common";
import {SaveResultsService} from "../../services/save-results.service";

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

  constructor(public saveResults: SaveResultsService) {}

  @Output() closeEndGame = new EventEmitter()

  arrayResults: Array<{text: string, answer: number, studentAnswer: number, right: boolean}> = []

  ngOnInit(){
    this.arrayResults = this.saveResults.saveResult
  }

  close() {
    this.closeEndGame.emit()
    this.saveResults.saveResult = []
  }
}
