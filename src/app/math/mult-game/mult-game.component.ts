import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mult-game',
  standalone: true,
  imports: [
    FormsModule
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


  next() {
    if (this.quantityAnswers === 1) {
      this.endGame.emit()

    }
    this.quantityAnswers --
    if (this.multiplierFirst * this.multiplierSecond === this.studentResponse) {
      this.correctAnswer ++
    } else {
      this.wrongAnswer ++
    }
    this.studentResponse = null
    this.generateMultiplierFirst()
    this.generateMultiplierSecond()
  }
}
