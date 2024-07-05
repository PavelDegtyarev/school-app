import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

export interface Examples {
  text: string
  right: boolean
  answer: number
  studentAnswer: number
  id?: string
  i?: Examples[]
  date?: Date
}

@Injectable({providedIn: 'root'})

export class HistoryService {
  constructor(private http: HttpClient) {
  }

  addExamples(examples: Examples[]): Observable<Examples[]> {
    return this.http.post<Examples[]>('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/history.json', examples)

  }

  getExamples() {
    return this.http.get('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/history.json')
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map(key => ({
            i: [ ...response[key]],
            id: key,
          }))

      }))

  }
}

