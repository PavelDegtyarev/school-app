import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Exercise} from "../interfaces";
import {AuthService} from "../../../shared/services/auth.service";
import {fbAuthResponse, UserData} from "../../../shared/interfaces";


@Injectable({providedIn: 'root'})

export class HistoryService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  userData2: fbAuthResponse = JSON.parse(localStorage.getItem('user')!)
  userData: any = this.authService.userData
  userId?: string

  // userData: any = {}


  addExamples(examples: {}): Observable<Exercise[]> {
    // console.log('historyComponent(addExamples): ', this.userData2)

    // console.log('Add examples(before): ', this.userId)
    // this.setUserId()
    // console.log('Add examples(after): ', this.userId)

    return this.http.post<Exercise[]>(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.returnUserId()}/math/history.json`, examples)

  }


 getExamples() {
   // console.log('historyComponent(getExamples): ', this.userData2)

   // console.log('Get examples(before): ', this.userId)
   //    this.setUserId()
   //  console.log('Get examples(after): ', this.userId)
    return this.http.get(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.returnUserId()}/math/history.json`)
      .pipe(map((response: { [key: string]: any }) => {
        // console.log(this.userName)
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))

      }))
  }

  remove(id: string) {
    // console.log('remove: ', this.userId)
    // this.setUserId()
    return this.http.delete(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.returnUserId()}/math/history/${id}.json`)
  }

  getExampleById(id: string) {
    // console.log('Get example by id: ', this.userId)
    // this.setUserId()
    return this.http.get(`https://school-app-f0f2d-default-rtdb.europe-west1.firebasedatabase.app/${this.returnUserId()}/math/history/${id}.json`)

      .pipe(map((exercise: Exercise) => {
        return {
          ...exercise,
          id
        }
      }))
  }

  setUserId() {
     this.authService.getUserData1().subscribe((response: UserData) => {
       this.userId = response.users[0].localId
      console.log('setUserId: ', this.userId)
      // console.log(response.users[0].localId)
    })
  }

  returnUserId(){
    // console.log('lsdlf: ', this.userData2.localId, this.userData2.displayName)
    return this.userData2.localId
  }
}

