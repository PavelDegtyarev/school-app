import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {fbAuthResponse, User} from "../shared/interfaces";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common"

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  loginForm!: FormGroup;
  errorMessage!: string


  ngOnInit(){
    this.loginForm = new FormGroup<any>({
      email: new FormControl('alenadegtyareva@mail.ru', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    })
  }
  loginUser() {
    // console.log(this.form.value)
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.authService.login(user).subscribe( (response) => {
      console.log('LoginResponse: ',response)
      this.loginForm.reset()
      this.router.navigateByUrl('/')
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.error.error.message
    })
  }
}
