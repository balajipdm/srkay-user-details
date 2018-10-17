import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppComponent } from './app.component';
import { ListComponent } from './users/list/list.component';
import { AddComponent } from './users/add/add.component';
import { UserService } from './users/user.service';
import { routing } from './app.routing';
import { ViewComponent } from './users/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    routing
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
