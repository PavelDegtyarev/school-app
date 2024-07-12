import {Pipe, PipeTransform} from "@angular/core";
import {Examples} from "../services/history.service";

@Pipe({
  standalone: true,
  name: 'operationSearchPipe'
})
export class OperationSearchPipe implements PipeTransform{
  transform(exercises: any, search = ''): any {
    // console.log('Exercise: ', exercises)
    if (search === 'allOperation' || search === ''){
      return exercises
    }
    return exercises.filter((exercise: Examples) => {
      return exercise.operation?.includes(search)
    })

  }

}
