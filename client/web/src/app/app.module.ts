import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WatchComponent } from './watch/watch.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { NewWatchInputComponent } from './new-watch-input/new-watch-input.component';

import { WatchService } from './watch.service';
import { WebsiteService } from './website.service';

@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    WatchListComponent,
    NewWatchInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WatchService, WebsiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
