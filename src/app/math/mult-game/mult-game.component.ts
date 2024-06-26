import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MathService} from "../../services/math-service.service";
import {MathComponent} from "../math.component";

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
export class MultGameComponent implements OnInit, AfterViewInit{
  constructor(
    public mathService: MathService,
    private mathComponent: MathComponent,
    ) {}

  @Output() endGame = new EventEmitter()


  quantityAnswers = 15
  correctAnswer = 0
  wrongAnswer = 0
  studentResponse!: number | null
  showCheckResult = false
  response = {text: '', right: true}
  example = this.mathService.getExample()

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  checkResult() {
    this.quantityAnswers --

    if (this.example.answer === this.studentResponse) {
      this.correctAnswer ++
      this.response.right = true
    } else {
      this.wrongAnswer ++
      this.response.right = false
    }
    this.response.text = `${this.example.text} = ${this.example.answer}`
    this.showCheckResult = true
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
