export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public maxUsers: number,
    public location_id: number
  ) {}
}
