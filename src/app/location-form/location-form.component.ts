import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { LocationFormErrorMessages } from './location-form-error-messages';
import { LocationFactory } from '../shared/location-factory';
import { LocationStoreService } from '../shared/location-store.service';
import { Location } from '../shared/location';

@Component({
  selector: 'impfen-location-form',
  templateUrl: './location-form.component.html'
})
export class LocationFormComponent implements OnInit {
  locationForm: FormGroup;
  location = LocationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingLocation = false;
  constructor(
    private fb: FormBuilder,
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.params['name'];
    if (name) {
      this.isUpdatingLocation = true;
      this.ls.getByName(name).subscribe(location => {
        this.location = location;
        this.initLocation();
      });
    }
    this.initLocation();
  }

  initLocation() {
    this.locationForm = this.fb.group({
      id: this.location.id,
      name: [this.location.name, Validators.required],
      city: [this.location.city, Validators.required],
      street: [this.location.street, Validators.required],
      housenumber: [this.location.housenumber, Validators.required],
      zipcode: [
        this.location.zipcode,
        [Validators.required, Validators.min(1000), Validators.max(9999)]
      ]
    });
    this.locationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of LocationFormErrorMessages) {
      const control = this.locationForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const updatedLocation: Location = LocationFactory.fromObject(
      this.locationForm.value
    );

    if (this.isUpdatingLocation) {
      this.ls.update(updatedLocation).subscribe(res => {
        this.router.navigate(['../../../locations/', updatedLocation.name], {
          relativeTo: this.route
        });
      });
    } else {
      this.ls.create(updatedLocation).subscribe(res => {
        this.router.navigate(['locations']);
      });
    }
  }
}
