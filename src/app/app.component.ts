import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, public authService: AuthService) {}
  //Method to logout
  logOut(): void {
    //clearing sessionStorage
    sessionStorage.clear();
    this.authService.logout();
    //Routing to loginPage 
    this.router.navigate(['/login']);
  }
}

