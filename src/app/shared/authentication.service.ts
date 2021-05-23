import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User } from './user';
import { UserStoreService } from './user-store.service';
import { UserFactory } from '../shared/user-factory';

interface Token {
  exp: number;
  user: {
    id: string;
    isAdmin: boolean;
    isVaccinated: boolean;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string = 'https://impfen.s1810456027.student.kwmhgb.at/api/auth';
  private userApi: string = 'https://impfen.s1810456027.student.kwmhgb.at/api/';
  currentUser: User = UserFactory.empty();

  constructor(private http: HttpClient, private us: UserStoreService) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('isAdmin', String(decodedToken.user.isAdmin));
    localStorage.setItem(
      'isVaccinated',
      String(decodedToken.user.isVaccinated)
    );
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isVaccinated');
  }

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      // console.log(expirationDate);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log('token expired');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isVaccinated');
        return false;
      }
      return true;
    }
    return false;
  }

  public getUserId() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;

      if (decodedToken.user.id) {
        return decodedToken.user.id;
      }
    }
  }

  public isAdmin() {
    if (localStorage.getItem('isAdmin')) {
      // console.log(localStorage.getItem('isAdmin'));
      return localStorage.getItem('isAdmin') == '1';
    }
  }

  public isVaccinated() {
    if (localStorage.getItem('isVaccinated')) {
      // console.log(localStorage.getItem('isVaccinated'));
      return localStorage.getItem('isVaccinated') == '1';
    }
  }

  public updateVaccinationStorage() {
    if (localStorage.getItem('isVaccinated') == '1') {
      localStorage.setItem('isVaccinated', '0');
    } else {
      localStorage.setItem('isVaccinated', '1');
    }
    // console.log(localStorage.getItem('isVaccinated'));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
