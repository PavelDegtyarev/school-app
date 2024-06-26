import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";
import {MathService} from "../../services/math-service.service";
import {SaveResultsService} from "../../services/save-results.service";
import {FocusAutoDirective} from "../../directives/focusAuto.directive";

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
  studentResponse!: number | null
  showCheckResult = false
  response = {text: '', right: true}
  example!: { text: string, answer: number }
  timer!: number
  form!: FormGroup
  buttonDisabled = false


  ngOnInit() {
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

    let resultToPush = {
      text: this.example.text,
      answer: this.example.answer,
      studentAnswer: this.studentResponse || 0,
      right: true
    }
    this.studentResponse = this.form.value.answer
    // console.log(this.form.value)
    // console.log('studentResponse',this.studentResponse)

    this.form.controls['answer'].reset()
    this.form.controls['answer'].disable()
    // this.form.reset()
    this.buttonDisabled = true
    console.log(this.form.get('answer')?.disabled)
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
    this.form.controls['answer'].enable()
    this.buttonDisabled= false


    // this.studentResponse = null
  }
}
