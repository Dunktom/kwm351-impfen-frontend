import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class UserStoreService {
  private api = 'https://impfen.s1810456027.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<User>> {
    return this.http
      .get(`${this.api}/users`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number) {
    return this.http
      .get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getByAppointmentId(id: number): Observable<Array<User>> {
    return this.http
      .get<User>(`${this.api}/users/appointment/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(user: User): Observable<any> {
    return this.http
      .put(`${this.api}/users/${user.id}`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateAppointment(user: User): Observable<any> {
    return this.http
      .put(`${this.api}/users/${user.id}`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateVaccination(id: number) {
    return this.http
      .put(`${this.api}/users/vaccinate/${id}`, '')
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateAppointmentId(userId: number, appId: number) {
    return this.http
      .put(`${this.api}/users/appointments/${userId}/${appId}`, '')
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.http
      .post(`${this.api}/users`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/users/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
