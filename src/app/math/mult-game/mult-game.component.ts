import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";
import {MathService} from "../shared/services/math-service.service";
import {SaveResultsService} from "../shared/services/save-results.service";
import {FocusAutoDirective} from "../../shared/directives/focusAuto.directive";
import {Items} from "../shared/interfaces";

@Component({
  selector: 'app-mult-game',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe,
    FocusAutoDirective,
    ReactiveFormsModule
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
  correctAnswer = 0
  wrongAnswer = 0
  studentResponse!: number
  showCheckResult = false
  response = {text: '', right: true}
  example!: { text: string, answer: number }
  timer!: number
  form!: FormGroup
  buttonDisabled = false


  ngOnInit() {
    this.saveResults.saveResult.quantityAnswers = this.quantityAnswers
    this.example = this.mathService.getExample()

    this.form = new FormGroup({
      answer: new FormControl('', Validators.required)
    })

    this.timer = setInterval(() => {
      if (this.leftTime < 1000) {
        this.endGame.emit()
      }
      this.leftTime = this.endTime - Date.now()
      this.leftTime -= 1
      // console.log('leftTime: ', this.leftTime)
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }


  checkResult() {
    this.studentResponse = this.form.value.answer
    let resultToPush: Items = {
      text: this.example.text,
      answer: this.example.answer,
      studentAnswer: this.studentResponse ,
      right: true,
    }

    // console.log('studentResponse: ', this.studentResponse)
    // console.log(this.form.value)

    this.form.controls['answer'].reset()
    this.form.controls['answer'].disable()
    // this.form.reset()
    this.buttonDisabled = true
    // console.log(this.form.get('answer')?.disabled)
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
      this.saveResults.saveResult.endTimeOfSolving = new Date()
      this.saveResults.saveResult.correctAnswer = this.correctAnswer
      this.saveResults.saveResult.wrongAnswer = this.wrongAnswer


      this.endGame.emit()
    }
  }

  next() {
    this.example = this.mathService.getExample()
    this.showCheckResult = false
    this.form.controls['answer'].enable()
    this.buttonDisabled= false


    // this.studentResponse = null
  }
}
