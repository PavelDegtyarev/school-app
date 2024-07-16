import {Pipe, PipeTransform} from "@angular/core";
import {Exercise} from "../interfaces";

@Pipe({
  name: 'timeSearchPipe',
  standalone: true
})
export class TimeSearchPipe implements PipeTransform{
  transform(exercises: Exercise[], search = ''): any {
    if (search === 'allTime' || search === '') {
      return exercises
    }
    if (search === 'lastDay') {
      return exercises.filter((exercise) => {
        // @ts-ignore
        return new Date(exercise.endTimeOfSolving).getTime() >= (new Date().getTime() - 86400000)
      })
    }

    if (search === 'threeDays') {
      return exercises.filter((exercise) => {
        // @ts-ignore
        return new Date(exercise.endTimeOfSolving).getTime() >= (new Date().getTime() - 86400000 * 3)
      })
    }

    if (search === 'sevenDays') {
      return exercises.filter((exercise) => {
        // @ts-ignore
        return new Date(exercise.endTimeOfSolving).getTime() >= (new Date().getTime() - 86400000 * 7)
      })
    }

    if (search === 'lastMonth') {
      return exercises.filter((exercise) => {
        // @ts-ignore
        return new Date(exercise.endTimeOfSolving).getTime() >= (new Date().getTime() - 86400000 * 30)
      })
    }
  }
}
