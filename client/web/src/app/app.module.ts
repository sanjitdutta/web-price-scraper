import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WatchComponent } from './watch/watch.component';
import { WatchListComponent } from './watch-list/watch-list.component';


@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    WatchListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
