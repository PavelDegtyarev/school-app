import { Injectable } from '@angular/core';
import {MultGameComponent} from "../math/mult-game/mult-game.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaveResultsService {

  constructor() {}

  saveResult: Array<{text: string, answer: number, studentAnswer: number, right: boolean}> = [
  ]

  onSaveResult(data: {text: string, answer: number, studentAnswer: number, right: boolean}) {
      this.saveResult.push(data)
    console.log(this.saveResult)
    }
}
