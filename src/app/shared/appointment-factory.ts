import { Appointment } from './appointment';

export class AppointmentFactory {
  static empty(): Appointment {
    return new Appointment(null, new Date(), 0, 0);
  }

  static fromObject(rawAppointment: any): Appointment {
    return new Appointment(
      rawAppointment.id,
      rawAppointment.date,
      rawAppointment.maxUsers,
      rawAppointment.location_id
    );
  }
}
