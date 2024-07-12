import {Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {MathComponent} from "./math/math.component";
import {LiteratureComponent} from "./literature/literature.component";
import {HistoryComponent} from "./math/history/history.component";
import {MainMath} from "./math/main-math/main-math";
import {ExerciseComponent} from "./math/exercise/exercise.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'math', component: MainMath, children: [
      {path: 'history', component: HistoryComponent},
      {path: 'train', component: MathComponent},
      {path: 'exercise/:id', component: ExerciseComponent}
    ]
  },
  {path: 'literature', component: LiteratureComponent},


  // {path: 'math', component: MathComponent},
  // {path: 'literature', component: LiteratureComponent},

];
