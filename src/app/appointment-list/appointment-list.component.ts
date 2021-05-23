import { ActivatedRoute, Router } from "@angular/router";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Appointment } from "../shared/appointment";
import { AppointmentStoreService } from "../shared/appointment-store.service";
import { LocationStoreService } from "../shared/location-store.service";

@Component({
  selector: "impfen-appointment-list",
  templateUrl: "./appointment-list.component.html"
})
export class AppointmentListComponent implements OnInit {
  @Input() locationId: number;
  @Output() location: Location;
  appointments: Appointment[];
  @Output() showDetailsEvent = new EventEmitter<Appointment>();


  constructor(
    private as: AppointmentStoreService,
    private ls: LocationStoreService
  ) {}

  ngOnInit() {
    // console.log("das ist die location id " + this.locationId);
    this.as
      .getByLocation(this.locationId)
      .subscribe(res => (this.appointments = res));
    this.ls.getById(this.locationId).subscribe(res => (this.location = res));
  }
}
