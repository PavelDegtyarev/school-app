import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MultGameComponent} from "./mult-game/mult-game.component";
import {EndGameComponent} from "./end-game/end-game.component";
import {MathService} from "../services/math-service.service";
import {SaveResultsService} from "../services/save-results.service";

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
export class MathComponent implements OnInit{
  playGame: boolean = false
  showEndGame: boolean = false
  formData!: {from: number, before: number, operation: string}
  form!: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      from: new FormControl('2'),
      before: new FormControl('2'),
      operation: new FormControl('multiply')
    })
  }
  start() {
    this.playGame = true
    this.formData = {...this.form.value}
    console.log(this.formData)
  }
  end() {
    this.playGame = false
    this.showEndGame = true
  }
  closeEndGame() {
    this.showEndGame = false
  }
}
