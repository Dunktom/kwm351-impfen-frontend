import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Location } from "./location";

@Injectable()
export class LocationStoreService {
  private api = "https://impfen.s1810456027.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Location>> {
    return this.http
      .get(`${this.api}/locations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number) {
    return this.http
      .get<Location>(`${this.api}/locations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getByName(name: String) {
    return this.http
      .get<Location>(`${this.api}/locations/search/${name}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/locations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(location: Location): Observable<any> {
    return this.http
      .put(`${this.api}/locations/${location.id}`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(location: Location): Observable<any> {
    return this.http
      .post(`${this.api}/locations`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
