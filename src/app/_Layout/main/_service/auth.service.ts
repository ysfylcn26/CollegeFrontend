import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const apiUrl = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials): Observable<any> {
    return this.http.post(apiUrl + "/api/auth/signin", {
      username: credentials.username,
      pass: credentials.pass
    }, httpOptions);
  }

  signUp(user): Observable<any> {
    return this.http.post(apiUrl + "/api/auth/signup", {
        username: user.username,
        email: user.email,
        pass: user.pass,
        role: user.role
    }, httpOptions)
  }
}