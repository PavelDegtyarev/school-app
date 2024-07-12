import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
export interface Items {
  text: string
  right: boolean
  answer: number
  studentAnswer: number
}
export interface Examples {
  items?: Items[]
  endTimeOfSolving?: Date | null
  quantityAnswers?: number
  correctAnswer?: number
  wrongAnswer?: number
  operation?: string

}

@Injectable({providedIn: 'root'})

export class HistoryService {
  constructor(private http: HttpClient) {
  }

  addExamples(examples: {}): Observable<Examples[]> {
    return this.http.post<Examples[]>('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history.json', examples)

  }

  getExamples() {
    return this.http.get('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history.json')
      // .pipe(map((response: { [key: string]: any }) => {
      //   return Object.keys(response)
      //     .map(key => ({
      //       i: [ ...response[key]],
      //       id: key,
      //     }))
      //
      // }))
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
      }))
  }

  remove(id: string) {
    return this.http.delete(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history/${id}.json`)
  }

  getExampleById(id: string) {
    return this.http.get(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history/${id}.json`)

      .pipe(map((exercise: Examples) => {
        return {
          ...exercise,
          id
        }

      }))
  }
}

