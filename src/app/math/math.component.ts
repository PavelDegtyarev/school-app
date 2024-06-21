import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MultGameComponent} from "./mult-game/mult-game.component";
import {EndGameComponent} from "./mult-game/end-game/end-game.component";

@Component({
  selector: 'app-math',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MultGameComponent,
    EndGameComponent
  ],
  templateUrl: './math.component.html',
  styleUrl: './math.component.css'
})
export class MathComponent {
  multiply: boolean = false
  from: number = 1
  before: number = 1
  playGame: boolean = false
  showEndGame = false
  resultGame!: [{}]

  start() {
    this.playGame = true
    console.log(this.multiply, this.from, this.before)
  }
  end() {
    this.playGame = false
    this.showEndGame = true
  }
  closeEndGame() {
    this.showEndGame = false
  }
}
