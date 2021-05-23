import { Component, Input, OnInit } from "@angular/core";
import { Location } from "../shared/location";

@Component({
  selector: "a.impfen-location-list-item",
  templateUrl: "./location-list-item.component.html"
})
export class LocationListItemComponent implements OnInit {
  @Input() location: Location;
  constructor() {}

  ngOnInit() {}
}
