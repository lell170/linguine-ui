import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { TrainingComponent } from './components/training/training.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ButtonPanelComponent } from './components/button-panel/button-panel.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { TranslationComponent } from './components/translation/translation.component';
import { AlertComponent } from './components/alert/alert.component';
import { CharacterComponent } from './components/character/character.component';
import { ResultViewComponent } from './components/result-view/result-view.component';

@NgModule({
  // another modules that should be imported
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule],
  // components belong to this module
  declarations: [MainComponent, HeaderComponent,
    TrainingComponent, NotFoundComponent, ButtonPanelComponent, ButtonComponent,
    ChallengeComponent, TranslationComponent, AlertComponent, CharacterComponent, ResultViewComponent],
  // bootstrapping (automatically load) components when this module is loaded
  bootstrap: [MainComponent],
  providers: []
})

export class AppModule {
}
