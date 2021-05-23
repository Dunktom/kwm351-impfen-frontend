import { User } from './user';

export class UserFactory {
  static empty(): User {
    return new User(null, '', '', '', '', '', 0, false, false, null);
  }

  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.firstName,
      rawUser.lastName,
      rawUser.email,
      rawUser.gender,
      rawUser.password,
      rawUser.socialSecurityNumber,
      rawUser.vaccinated,
      rawUser.admin,
      rawUser.appointment_id
    );
  }
}
