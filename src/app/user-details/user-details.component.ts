import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../shared/appointment';
import { AppointmentFactory } from '../shared/appointment-factory';
import { AppointmentStoreService } from '../shared/appointment-store.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Location } from '../shared/location';
import { LocationFactory } from '../shared/location-factory';
import { LocationStoreService } from '../shared/location-store.service';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserStoreService } from '../shared/user-store.service';

@Component({
  selector: 'impfen-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = UserFactory.empty();
  location: Location = LocationFactory.empty();
  appointment: Appointment = AppointmentFactory.empty();
  isAdmin: Boolean = false;
  currentUserId = null;

  constructor(
    private us: UserStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private as: AppointmentStoreService,
    private ls: LocationStoreService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.currentUserId = this.authService.getUserId();
    const params = this.route.snapshot.params;
    // console.log('Params-Name: ' + params);

    this.us.getById(params['id']).subscribe(u => {
      this.user = u;
      if (this.user.appointment_id) {
        this.as.getById(this.user.appointment_id).subscribe(b => {
          this.appointment = b;
          this.ls.getById(this.appointment.location_id).subscribe(l => {
            this.location = l;
          });
        });
      }
    });
  }

  removeUser() {
    if (confirm('Benutzer wirklich löschen?')) {
      this.us
        .remove(this.user.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }

  onChange(id: number) {
    // if admin vacces himself session storage is updated
    if (this.currentUserId == id) {
      this.authService.updateVaccinationStorage();
    }

    this.us.updateVaccination(id).subscribe(res =>
      this.us.getById(id).subscribe(u => {
        this.user = u;
      })
    );
  }
}
