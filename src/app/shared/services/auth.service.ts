import {Injectable} from "@angular/core";
import {fbAuthResponse, User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  userData = JSON.parse(localStorage.getItem('user')!)

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

  returnUserId(){
    const userData: fbAuthResponse = JSON.parse(localStorage.getItem('user')!)
    return userData.localId
  }
}

// tap(this.setUserName(user.email)),
