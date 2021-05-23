import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { AppointmentFormErrorMessages } from './appointment-form-error-messages';
import { AppointmentFactory } from '../shared/appointment-factory';
import { AppointmentStoreService } from '../shared/appointment-store.service';
import { Appointment } from '../shared/appointment';
import { Location } from '../shared/location';
import { LocationStoreService } from '../shared/location-store.service';

@Component({
  selector: 'impfen-appointment-form',
  templateUrl: './appointment-form.component.html'
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  appointment = AppointmentFactory.empty();
  allLocations: Location[];
  errors: { [key: string]: string } = {};
  isUpdatingAppointment = false;

  constructor(
    private fb: FormBuilder,
    private as: AppointmentStoreService,
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.ls.getAll().subscribe(res => {
      this.allLocations = res;
      if (id) {
        this.isUpdatingAppointment = true;
        this.as.getById(id).subscribe(appointment => {
          this.appointment = appointment;
          // console.log('Location ID: ' + this.appointment.location_id);
          // console.log('Locations All: ', this.allLocations);
          this.initAppointment();
          this.appointmentForm.controls['location_id'].setValue(
            this.allLocations.find(
              loc => loc.id == this.appointment.location_id
            ).id
          );
        });
      }
    });
    this.initAppointment();
  }

  initAppointment() {
    this.appointmentForm = this.fb.group({
      id: this.appointment.id,
      date: [this.appointment.date, Validators.required],
      maxUsers: [this.appointment.maxUsers, Validators.required],
      location_id: ['', Validators.required]
    });
    this.appointmentForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    // console.log("Is update " + this.isUpdatingAppointment);
    // console.log('Is invalid? ' + this.appointmentForm.invalid);

    this.errors = {};
    for (const message of AppointmentFormErrorMessages) {
      const control = this.appointmentForm.get(message.forControl);
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
    const updatedAppointment: Appointment = AppointmentFactory.fromObject(
      this.appointmentForm.value
    );

    //console.log(updatedAppointment);
    //console.log('Appointment ID ' + updatedAppointment.id);
    //console.log('Appointment Location ' + updatedAppointment.location_id);

    if (this.isUpdatingAppointment) {
      this.as.update(updatedAppointment).subscribe(res => {
        this.router.navigate(['/locations'], {
          relativeTo: this.route
        });
      });
    } else {
      this.as.create(updatedAppointment).subscribe(res => {
        this.router.navigate(['/locations']);
      });
    }
  }
}
