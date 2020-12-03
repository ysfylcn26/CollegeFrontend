import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TOKEN_KEY, ROLE_ADMIN, ROLE_USER, ROLE_SUPER_ADMIN} from '../constant';
import jwt_decode from 'jwt-decode';
import {UserService} from './user.service';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    role = new BehaviorSubject<string>(ROLE_USER);
    signStatu = new BehaviorSubject<boolean>(false);
    responsibility = new BehaviorSubject<string>(null);

    constructor(private http: HttpClient) {
    }

    signIn(credentials): Observable<any> {
        return this.http.post(apiUrl + '/api/auth/signin', credentials);
    }

    signUp(user): Observable<any> {
        return this.http.post(apiUrl + '/api/auth/signup', user);
    }

    isAdmin(): boolean {
        if (sessionStorage.getItem(TOKEN_KEY)) {
            const decoded = jwt_decode(sessionStorage.getItem(TOKEN_KEY));
            if (decoded.roles && (decoded.roles === ROLE_ADMIN || decoded.roles === ROLE_SUPER_ADMIN)) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    isSuperAdmin(): boolean {
        if (sessionStorage.getItem(TOKEN_KEY)) {
            const decoded = jwt_decode(sessionStorage.getItem(TOKEN_KEY));
            if (decoded.roles === ROLE_SUPER_ADMIN) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    hasResponsibility(): void{
        this.http.get<string>(apiUrl + '/user/responsibility').subscribe( data => {
           this.responsibility.next(data);
        });
    }

    isResponsibility(): Observable<string>{
        return this.responsibility.asObservable();
    }

    hasToken(): boolean {
        if (sessionStorage.getItem(TOKEN_KEY)) {
            return true;
        } else {
            return false;
        }
    }

    setRoleValue(role: string): void {
        this.role.next(role);
    }

    getRoleValue(): Observable<string> {
        return this.role.asObservable();
    }

    setSignStatus(statu: boolean): void {
        this.signStatu.next(statu);
    }

    getSignStatus(): Observable<boolean> {
        return this.signStatu.asObservable();
    }

    setInitialValue(): void{
        if (sessionStorage.getItem(TOKEN_KEY)){
            const decoded = jwt_decode(sessionStorage.getItem(TOKEN_KEY));
            if(decoded.roles){
                this.setRoleValue(decoded.roles);
                this.setSignStatus(true);
            }
        }
    }
}
