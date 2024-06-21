import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ResultComponent} from "./result/result.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-mult-game',
  standalone: true,
  imports: [
    FormsModule,
    ResultComponent,
    NgIf
  ],
  templateUrl: './mult-game.component.html',
  styleUrl: './mult-game.component.css'
})
export class MultGameComponent implements OnInit{
  @Input() from!: number
  @Input() before!: number

  @Output() endGame = new EventEmitter()
  multiplierFirst!: number
  multiplierSecond!: number

  quantityAnswers = 15
  correctAnswer = 0
  wrongAnswer = 0
  studentResponse!: number | null
  showCheckResult = false
  response = {text: '', right: true}

  ngOnInit() {
    this.generateMultiplierFirst()
    this.generateMultiplierSecond()
  }

  generateMultiplierFirst() {
    let min = this.from || 0
    let max = this.before || 0
    this.multiplierFirst = Math.floor(Math.random() * (max - min + 1) + min)
  }

  generateMultiplierSecond() {
    let min = 0
    let max = 9
    this.multiplierSecond = Math.floor(Math.random() * (max - min + 1) + min)
  }

  checkResult() {
    this.quantityAnswers --

    if (this.multiplierFirst * this.multiplierSecond === this.studentResponse) {
      this.correctAnswer ++
      this.response.right = true
    } else {
      this.wrongAnswer ++
      this.response.right = false
    }
    this.response.text = `${this.multiplierFirst} x ${this.multiplierSecond} = ${this.multiplierFirst * this.multiplierSecond}`
    this.showCheckResult = true


  }

  next() {
    this.showCheckResult = false

    if (this.quantityAnswers === 0) {
      this.endGame.emit()
    }
   this.studentResponse = null
    this.generateMultiplierFirst()
    this.generateMultiplierSecond()
  }
}
