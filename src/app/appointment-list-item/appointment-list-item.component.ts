import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../shared/appointment';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserStoreService } from '../shared/user-store.service';

@Component({
  selector: 'a.impfen-appointment-list-item',
  templateUrl: './appointment-list-item.component.html'
})
export class AppointmentListItemComponent implements OnInit {
  @Input() appointment: Appointment;
  users: User[];
  freeSpots: Number;

  constructor(private us: UserStoreService) {}

  ngOnInit() {
    this.us
      .getByAppointmentId(this.appointment.id)
      .subscribe(res => {
        this.users = res;

        this.freeSpots = this.appointment.maxUsers - this.users.length;

      });
  }
}
