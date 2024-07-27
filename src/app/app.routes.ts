import {Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {MathComponent} from "./math/math.component";
import {LiteratureComponent} from "./literature/literature.component";
import {HistoryComponent} from "./math/history/history.component";
import {MainMath} from "./math/main-math/main-math";
import {ExerciseComponent} from "./math/exercise/exercise.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {ListOfLiteratureComponent} from "./literature/list-of-literature/list-of-literature.component";
import {MainLiteratureComponent} from "./literature/main-literature/main-literature.component";

export const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {
        path: 'math', component: MainMath, canActivate: [AuthGuard],  children: [
          {path: 'history', component: HistoryComponent},
          {path: 'train', component: MathComponent},
          {path: 'exercise/:id', component: ExerciseComponent}
        ]
      },
      {path: 'literature', component: MainLiteratureComponent, canActivate: [AuthGuard], children: [
        ]},
      {path: 'listOfLiterature', component: ListOfLiteratureComponent, canActivate: [AuthGuard],},

    ]},

  {path: '**', component: ErrorPageComponent}


  // {path: 'math', component: MathComponent},
  // {path: 'literature', component: LiteratureComponent},

];
