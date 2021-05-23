import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Location } from '../shared/location';
import { LocationStoreService } from '../shared/location-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationFactory } from '../shared/location-factory';
import { AppointmentStoreService } from '../shared/appointment-store.service';
import { Appointment } from '../shared/appointment';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'impfen-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
  appointments: Appointment[];
  //isAdmin: Boolean = this.authService.isAdmin();
  isAdmin: Boolean = false;
  locationId: number;

  constructor(
    private ls: LocationStoreService,
    private as: AppointmentStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const params = this.route.snapshot.params;
    this.ls.getByName(params['name']).subscribe(b => {
      this.location = b;
      this.locationId = this.location.id;
      // console.log("Das ist die ID in location-details " + this.locationId);
    });
  }

  removeLocation() {
    if (confirm('Impfzentrum wirklich entfernen?')) {
      this.ls
        .remove(this.location.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }
}
