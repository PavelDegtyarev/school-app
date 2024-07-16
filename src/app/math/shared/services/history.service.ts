import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Exercise} from "../interfaces";





@Injectable({providedIn: 'root'})

export class HistoryService {
  constructor(private http: HttpClient) {
  }

  addExamples(examples: {}): Observable<Exercise[]> {
    return this.http.post<Exercise[]>('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history.json', examples)

  }

  getExamples() {
    return this.http.get('https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/math/history.json')
      .pipe(map((response: { [key: string]: any }) => {
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

      .pipe(map((exercise: Exercise) => {
        return {
          ...exercise,
          id
        }
      }))
  }
}

