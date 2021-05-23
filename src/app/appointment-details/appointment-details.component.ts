import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/appointment';
import { AppointmentStoreService } from '../shared/appointment-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentFactory } from '../shared/appointment-factory';
import { Location } from '../shared/location';
import { LocationFactory } from '../shared/location-factory';
import { LocationStoreService } from '../shared/location-store.service';
import { User } from '../shared/user';
import { UserStoreService } from '../shared/user-store.service';
import { AuthenticationService } from '../shared/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'impfen-appointment-details',
  templateUrl: './appointment-details.component.html'
})
export class AppointmentDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
  appointment: Appointment = AppointmentFactory.empty();
  users: User[];
  freeSpots: Number;

  isAdmin: Boolean = false;
  isVaccinated: Boolean = false;

  constructor(
    private as: AppointmentStoreService,
    private ls: LocationStoreService,
    private us: UserStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.isAdmin = this.authService.isAdmin();
    this.isVaccinated = this.authService.isVaccinated();
    this.ls.getByName(params['name']).subscribe(l => {
      this.location = l;
    });

    this.as.getById(params['id']).subscribe(b => {
      this.appointment = b;

      this.us.getByAppointmentId(this.appointment.id).subscribe(res => {
        this.users = res;

        // console.log(this.users);

        this.freeSpots = this.appointment.maxUsers - this.users.length;
        // console.log('free spots: ' + this.freeSpots);
      });
    });
  }

  removeAppointment() {
    if (confirm('Termin wirklich löschen?')) {
      this.as
        .remove(this.appointment.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }

  updateAppointment() {
    let currentUserId = Number(localStorage.getItem('userId'));

    /*
    console.log(
      'User ID is: ' +
        currentUserId +
        ' and appointment id ' +
        this.appointment.id
    );
    */

    this.us
      .updateAppointmentId(currentUserId, this.appointment.id)
      .subscribe(res => {
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      });
  }
}
