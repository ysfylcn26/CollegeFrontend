import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TOKEN_KEY, ROLE_ADMIN, ROLE_USER } from '../constant';
import jwt_decode from "jwt-decode";

const apiUrl = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role = new BehaviorSubject<string>(ROLE_USER);

  signStatu = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signIn(credentials): Observable<any> {
    return this.http.post(apiUrl + "/api/auth/signin", credentials, httpOptions);
  }

  signUp(user): Observable<any> {
    return this.http.post(apiUrl + "/api/auth/signup", user, httpOptions)
  }

  getRole(){
    if(sessionStorage.getItem(TOKEN_KEY)){
      var decoded = jwt_decode(sessionStorage.getItem(TOKEN_KEY)); 
      if(decoded.roles && decoded.roles.includes(ROLE_ADMIN))
        return true;
      return false
    }else{
      return false;
    }
  }

  setRoleValue(role: string){
    this.role.next(role);
  }

  getRoleValue(): Observable<string>{
    return this.role.asObservable();
  }

  setSignStatus(statu: boolean){
    this.signStatu.next(statu);
  }

  getSignStatus(): Observable<boolean>{
    return this.signStatu.asObservable();
  }
}