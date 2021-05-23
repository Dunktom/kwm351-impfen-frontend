import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationListItemComponent } from './location-list-item/location-list-item.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationStoreService } from './shared/location-store.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppointmentStoreService } from './shared/appointment-store.service';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentListItemComponent } from './appointment-list-item/appointment-list-item.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LocationFormComponent } from './location-form/location-form.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AdminComponent } from './admin/admin.component';
import { UserStoreService } from './shared/user-store.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { JwtInterceptorService } from './shared/jwt-interceptor.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LocationListComponent,
    LocationListItemComponent,
    HomeComponent,
    LocationDetailsComponent,
    AppointmentDetailsComponent,
    AppointmentListComponent,
    AppointmentListItemComponent,
    LocationFormComponent,
    AppointmentFormComponent,
    AdminComponent,
    UserListComponent,
    UserListItemComponent,
    UserDetailsComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    LocationStoreService,
    AppointmentStoreService,
    AuthenticationService,
    UserStoreService,
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class AppModule {}
