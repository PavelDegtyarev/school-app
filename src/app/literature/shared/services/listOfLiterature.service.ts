import {Injectable} from "@angular/core";
import {Book} from "../interface";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class ListOfLiteratureService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }
  listOfBooks: Book[] = [
    // {titleOfBook: 'Приключения Незнайки', authorOfBook: 'Николай Носов', isReading: true},
    // {titleOfBook: 'Война и мир', authorOfBook: 'Толстой Л.Н.', isReading: false},
    // {titleOfBook: 'Анна Каренина', authorOfBook: 'Толстой Л.Н.', isReading: false},
  ]

  addNewBook(data: Book): Observable<Book>{
    return this.http.post(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.authService.returnUserId()}/literature/listOfLiterature.json`, data)
      .pipe(map((resp: any) => {
        console.log('resp: ', resp)
        return {
          ...data,
          id: resp.name,
        }
      }))
    // this.listOfBooks.push(data)
  }

  loadAllBooks(){
    return this.http.get(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.authService.returnUserId()}/literature/listOfLiterature.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
              id: key
          }))
      }))
  }

  removeBook(id: string | undefined){
    return this.http.delete(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.authService.returnUserId()}/literature/listOfLiterature/${id}.json`)
  }

  updateBook(book: Book) {
    return this.http.patch(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.authService.returnUserId()}/literature/listOfLiterature/${book.id}.json`, book)
  }
}
