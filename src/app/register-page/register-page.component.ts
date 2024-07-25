import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/interfaces";
import {Auth} from "@angular/fire/auth";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common"

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  registerForm!: FormGroup;
  errorMessage!: string

  ngOnInit(){
    this.registerForm = new FormGroup<any>({
      email: new FormControl('alenadegtyareva@mail.ru', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('AlenaDegtyareva', [Validators.required])
    })
  }
  createUser() {
    // console.log(this.form.value)
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    }

    this.authService.register(user).subscribe({
      next: (response) => {
      console.log('responseRegister: ', response)
      this.registerForm.reset()
      this.router.navigate(['/'])
    },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error.message
        console.log('erroR: ',this.errorMessage)
      }
    })
    // console.log(this.registerForm.value)
  }
}
