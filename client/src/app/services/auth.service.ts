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
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const isAdmin = localStorage.getItem('isAdmin');

    if (isAdmin === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
