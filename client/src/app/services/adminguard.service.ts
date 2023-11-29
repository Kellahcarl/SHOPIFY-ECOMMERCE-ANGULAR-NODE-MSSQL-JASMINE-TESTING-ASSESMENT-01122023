import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor (private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
