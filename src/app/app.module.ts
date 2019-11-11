import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MainComponent} from './components/main/main.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  // another modules that should be imported
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  // components belong to this module
  declarations: [MainComponent, HeaderComponent],
  // bootstrapping (automatically load) components when this module is loaded
  bootstrap: [MainComponent]
})

export class AppModule {
}
