import {Pipe, PipeTransform} from "@angular/core";
import {Exercise} from "../interfaces";

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
    return exercises.filter((exercise: Exercise) => {
      return exercise.operation?.includes(search)
    })

  }

}
