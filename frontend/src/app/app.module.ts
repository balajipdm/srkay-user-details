import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppComponent } from './app.component';
import { ListComponent } from './users/list/list.component';
import { FormComponent } from './users/form/form.component';
import { UserService } from './users/user.service';
import { routing } from './app.routing';
import { ViewComponent } from './users/view/view.component';
import { CustomHttpInterceptor } from './helpers/custom-http.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    routing
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
