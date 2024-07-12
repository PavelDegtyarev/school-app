import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {Examples, HistoryService} from "../services/history.service";
import {NgForOf} from "@angular/common";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit{

  exercise: Examples = {}
  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.historyService.getExampleById(params['id'])
      })
    )
      .subscribe((response) => {
      this.exercise = response
      console.log(response)
      // console.log(this.historyService.getExample(params['id']))
    })
  }
}
