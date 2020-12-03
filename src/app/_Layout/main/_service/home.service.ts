import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../component/dto/country';
import {College} from '../component/dto/college';
import {Department} from '../component/dto/department';
import {InfoResponse} from '../dto/info-response';

const API_URL: string = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getCountry(): Observable<Country[]> {
        return this.http.get<Country[]>(API_URL + '/country/get');
    }

    getCollege(country: string): Observable<College[]>{
        return  this.http.get<Country[]>(API_URL + '/college/' + country);
    }

    getDepartment(college: string): Observable<Department[]>{
        return this.http.get<Department[]>(API_URL + '/department/' + college);
    }

    getDegrees(): Observable<any>{
        return this.http.get<any>(API_URL + '/department/degrees');
    }

    getInfo(departmentId: string): Observable<InfoResponse>{
        return this.http.get<InfoResponse>(API_URL + '/department/info/' + departmentId);
    }
}
