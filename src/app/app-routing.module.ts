import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TrainingComponent} from './components/training/training.component';
import {ChallengeComponent} from './components/challenge/challenge.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

// Roting definition
const appRoutes: Routes = [
  {path: 'training', component: TrainingComponent},
  {path: 'challenge', component: ChallengeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {
}
