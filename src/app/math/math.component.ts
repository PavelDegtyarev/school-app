import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MultGameComponent} from "./mult-game/mult-game.component";
import {EndGameComponent} from "./end-game/end-game.component";
import {MathService} from "../services/math-service.service";
import {SaveResultsService} from "../services/save-results.service";
import {MyValidators} from "../my-validators";


@Component({
  selector: 'app-math',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MultGameComponent,
    EndGameComponent,
    ReactiveFormsModule
  ],
  templateUrl: './math.component.html',
  styleUrl: './math.component.css',
  providers: [MathService, SaveResultsService]
})
export class MathComponent implements OnInit {
  playGame: boolean = false
  showEndGame: boolean = false
  formData!: { from: number, to: number, operation: string }
  form!: FormGroup
  myForm!: FormGroup

  constructor(
    private mathService: MathService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.myForm = this.fb.group({
    //   myNumberInput: ['', [Validators.required, validateNumber]]
    // })

    this.form = new FormGroup({
      from: new FormControl(1, [Validators.min(0), Validators.required]),
      to: new FormControl(1,  [Validators.min(0), Validators.required] ),
      operation: new FormControl('multiply'),
      numberExamples: new FormControl(15)
    }, [MyValidators.fromLessTo])
  }



  start() {
    // console.log(this.form)
    this.mathService.setCondition({...this.form.value})
    this.playGame = true
  }

  end() {
    this.playGame = false
    this.showEndGame = true
  }

  closeEndGame() {
    this.showEndGame = false
  }
}



