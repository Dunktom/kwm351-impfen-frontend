import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { HomeComponent } from './home/home.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'locations', component: LocationListComponent },
  { path: 'locations/:name', component: LocationDetailsComponent },
  { path: 'locations/:name/:id', component: AppointmentDetailsComponent },

  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/locations', component: LocationFormComponent },
  { path: 'admin/locations/:name', component: LocationFormComponent },
  { path: 'admin/appointments/:name/:id', component: AppointmentFormComponent },
  { path: 'admin/appointments', component: AppointmentFormComponent },
  { path: 'admin/users/:id', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
