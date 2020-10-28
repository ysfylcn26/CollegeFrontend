import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return true;
    }
    else {
      return this.router.parseUrl('/sign-in');
    }
  }

}
