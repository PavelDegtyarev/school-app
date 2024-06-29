import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MathService} from "../../services/math-service.service";
import {SaveResultsService} from "../../services/save-results.service";

@Component({
  selector: 'app-mult-game',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './mult-game.component.html',
  styleUrl: './mult-game.component.css'
})
export class MultGameComponent implements OnInit{
  constructor(
    public mathService: MathService,
    public saveResults: SaveResultsService
    ) {}

  @Output() endGame = new EventEmitter()


  quantityAnswers = 15
  correctAnswer = 0
  wrongAnswer = 0
  studentResponse!: number | null
  showCheckResult = false
  response = {text: '', right: true}
  example!: {text: string, answer: number}


  ngOnInit() {
    this.example = this.mathService.getExample()
  }
  checkResult() {
    let resultToPush = {text: this.example.text, answer: this.example.answer, studentAnswer: this.studentResponse || 0, right: true}
    this.quantityAnswers --

    if (this.example.answer === this.studentResponse) {
      this.correctAnswer ++
      this.response.right = true
    } else {
      this.wrongAnswer ++
      this.response.right = false
      resultToPush.right = false
    }
    this.response.text = `${this.example.text} = ${this.example.answer}`
    this.showCheckResult = true
    this.saveResults.onSaveResult(resultToPush)
  }

  next() {
    this.example = this.mathService.getExample()
    this.showCheckResult = false

    if (this.quantityAnswers === 0) {
      this.endGame.emit()
    }
   this.studentResponse = null
  }
}
