import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  logout(): void {
    // Clear local storage data
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
  checkLocalStorage(): void {
    const requiredFields = ['user_name', 'user_id', 'is_admin'];

    // Check if all required fields are present
    const missingField = requiredFields.find(
      (field) => !localStorage.getItem(field)
    );

    if (missingField) {
      this.router.navigate(['/login']);
    }
  }
  watchLocalStorage(): Observable<Event> {
    const storageEvent$ = fromEvent(window, 'storage');
    return merge(storageEvent$).pipe(debounceTime(300));
  }

  isAuthenticated(): boolean {
    // Implement your authentication logic here (e.g., check if user_name exists in local storage)
    return !!localStorage.getItem('user_name');
  }
}

export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is admin
    const isAdmin = localStorage.getItem('is_admin') === 'true';

    if (isAdmin) {
      return true;
    } else {
      // Redirect to login or another page
      this.router.navigate(['/products']);
      return false;
    }
  }
}

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    console.log(this.authService.isAuthenticated());

    if (!this.authService.isAuthenticated()) {
      // User is not logged in, allow access
      return true;
    } else {
      // User is already logged in, redirect to products page
      this.router.navigate(['/products']);
      return false;
    }
  }
}
