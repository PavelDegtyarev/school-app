import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";
import {MathService} from "../../services/math-service.service";
import {SaveResultsService} from "../../services/save-results.service";

@Component({
  selector: 'app-mult-game',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './mult-game.component.html',
  styleUrl: './mult-game.component.css'
})
export class MultGameComponent implements OnInit, OnDestroy {
  constructor(
    public mathService: MathService,
    public saveResults: SaveResultsService
  ) {
  }

  @Output() endGame = new EventEmitter()


  quantityAnswers = this.mathService.formData.numberExamples
  endTime = Date.now() + (this.quantityAnswers * 12000)
  leftTime: number = this.endTime - Date.now()
  // leftTime: number = 3
  correctAnswer = 0
  wrongAnswer = 0
  studentResponse!: number | null
  showCheckResult = false
  response = {text: '', right: true}
  example!: { text: string, answer: number }
  timer!: number


  ngOnInit() {
    this.example = this.mathService.getExample()

    this.timer = setInterval(() => {
      if (this.leftTime < 1000) {
        this.endGame.emit()
      }
      this.leftTime = this.endTime - Date.now()
      this.leftTime -= 1
      console.log('leftTime: ', this.leftTime)
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }


  checkResult() {
    let resultToPush = {
      text: this.example.text,
      answer: this.example.answer,
      studentAnswer: this.studentResponse || 0,
      right: true
    }
    this.quantityAnswers--

    if (this.example.answer === this.studentResponse) {
      this.correctAnswer++
      this.response.right = true
    } else {
      this.wrongAnswer++
      this.response.right = false
      resultToPush.right = false
    }
    this.response.text = `${this.example.text} = ${this.example.answer}`
    this.showCheckResult = true
    this.saveResults.onSaveResult(resultToPush)
    if (this.quantityAnswers === 0) {
      this.endGame.emit()
    }
  }

  next() {
    this.example = this.mathService.getExample()
    this.showCheckResult = false


    this.studentResponse = null
  }
}
