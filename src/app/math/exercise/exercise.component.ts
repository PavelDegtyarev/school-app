import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {Examples, HistoryService} from "../services/history.service";
import {DatePipe, NgForOf} from "@angular/common";
import {switchMap} from "rxjs";
import {HistoryComponent} from "../history/history.component";
import {TranslatePipe} from "../pipes/translate.pipe";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    TranslatePipe,
    DatePipe,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit{

  exercise: Examples = {}
  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private router: Router
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
      console.log('Response: ',response)
      // console.log('Response: ',this.exercise.id)
      // console.log(this.historyService.getExample(params['id']))
    })
  }

  removeExercise(id: string) {
    this.historyService.remove(id).subscribe(() => {
      // console.log('remove')
      this.router.navigate(['/math', 'history'])
    })

  }
}
