import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'impfen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserId() {
    return this.authService.getUserId();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
}
