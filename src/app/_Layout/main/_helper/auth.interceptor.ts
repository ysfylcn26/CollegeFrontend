import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHeaders} from '@angular/common/http';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from '../_service/token-storage.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../_service/auth.service';
import {AlertService} from '../_service/alert.service';
import {Alert, AlertType} from '../dto/alert';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService,
                private router: Router,
                private auth: AuthService,
                private alert: AlertService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        if (token != null) {
            authReq = req.clone({headers});
        }
        return next.handle(authReq).pipe(catchError(err => {
            if (err.status !== 401) {
                return throwError(err);
            }
            sessionStorage.clear();
            this.auth.setSignStatus(false);
            this.router.navigateByUrl('/sign-in');
            this.alert.alert(new Alert('Again login', 'Token time is finish', AlertType.WARNING));
        }));
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
