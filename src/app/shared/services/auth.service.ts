import {Injectable} from "@angular/core";
import {fbAuthResponse, User, UserData} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HistoryService} from "../../math/shared/services/history.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    // private historyService: HistoryService,
  ) {
  }

  userData = JSON.parse(localStorage.getItem('user')!)
  userData1: Observable<any> = this.getUserData1()

  get token() {
    let expDate = new Date(String(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout()
      return null
    } else {
      return localStorage.getItem('fb-token')
    }
  }

  isAuthenticated() {
    return Boolean(this.token)
  }

  logout() {
    this.setToken(null)
    // this.userData = {}
  }

  login(user: User) {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, user)
      .pipe(tap(this.setToken),
        map((response): any => {
          // console.log('resp: ', response)
          if (response) {
            // this.userData = response
            localStorage.setItem('displayName', <string>response.displayName)
            localStorage.setItem('user', JSON.stringify(response))
            return response
          }
        }))
  }


  register(user: User) {
    const data = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
      displayName: user.name,
    }
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSyZaiXLadm08d5WRT_R0jsOaFQcWKpOM', data)
      .pipe(tap(this.setToken),
        map((response) => {
          if (response) {
            // this.userData = response
            localStorage.setItem('displayName', <string>response.displayName)
            localStorage.setItem('user', JSON.stringify(response))
          }
        }))

  }

  getUserData() {

    const data = {
      idToken: localStorage.getItem('fb-token'),
    }
    // console.log('Data: ', data)
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebase.apiKey}`, data)
      .subscribe((resp) => {
        this.userData = resp
        // @ts-ignore
        this.historyService.userName = resp.users[0].displayName
        console.log('userData: ', this.userData)
      })
  }

  private setToken(response: fbAuthResponse | null) {

    if (response) {
      const expDate: Date = new Date(new Date().getTime() + Number(response.expiresIn) * 1000)
      localStorage.setItem('fb-token', <string>response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

   getUserData1(): Observable<any> {
    const data = {
      idToken: localStorage.getItem('fb-token'),
    }
     // console.log('data: ', data)
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebase.apiKey}`, data)
      // .pipe(map(resp => {
      //   return resp
      // }))
  }
}

// tap(this.setUserName(user.email)),
