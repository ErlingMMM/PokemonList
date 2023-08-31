import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // Checking if trainerData exists in sessionStorage if yes => trainerPage, not if not => loginPage. 
    if (!sessionStorage.getItem('trainer')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
