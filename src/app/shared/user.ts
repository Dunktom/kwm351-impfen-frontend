export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
    public password: string,
    public socialSecurityNumber: number,
    public vaccinated: boolean,
    public admin: boolean,
    public appointment_id?: number
  ) {}
}
