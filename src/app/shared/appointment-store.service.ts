import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Appointment } from './appointment';

@Injectable()
export class AppointmentStoreService {
  private api = 'https://impfen.s1810456027.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Appointment>> {
    return this.http
      .get(`${this.api}/appointments`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number) {
    return this.http
      .get<Appointment>(`${this.api}/appointments/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getByLocation(id: number): Observable<Array<Appointment>> {
    return this.http
      .get<Appointment>(`${this.api}/appointments/location/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(appointment: Appointment): Observable<any> {
    return this.http
      .put(`${this.api}/appointments/${appointment.id}`, appointment)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(appointment: Appointment): Observable<any> {
    return this.http
      .post(`${this.api}/appointments`, appointment)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/appointments/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
