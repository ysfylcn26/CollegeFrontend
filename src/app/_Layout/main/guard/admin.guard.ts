import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { TOKEN_KEY } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authSerive: AuthService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      if (this.authSerive.isAdmin()) {
        return true;
      }
      else {
        return this.router.parseUrl('/home');
      }
    }
    else {
      return this.router.parseUrl('/sign-in');
    }
  }

}
