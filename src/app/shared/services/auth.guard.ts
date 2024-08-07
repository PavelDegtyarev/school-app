import {Injectable} from "@angular/core";
import {Router} from "@angular/router"
import {ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service"
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      this.authService.logout()
      this.router.navigate(['', 'login'])
      return false
    }

  }

}
