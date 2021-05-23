import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Location } from "../shared/location";
import { LocationStoreService } from "../shared/location-store.service";

@Component({
  selector: "impfen-location-list",
  templateUrl: "./location-list.component.html"
})
export class LocationListComponent implements OnInit {
  locations: Location[];
  @Output() showDetailsEvent = new EventEmitter<Location>();

  constructor(private ls: LocationStoreService) {}

  ngOnInit() {
    this.ls.getAll().subscribe(res => (this.locations = res));
  }
}
