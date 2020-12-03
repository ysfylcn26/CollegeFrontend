import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Department} from '../component/dto/department';
import {Country} from '../component/dto/country';
import {College} from '../component/dto/college';
import {Info} from '../dto/info';
import {InfoResponse} from '../dto/info-response';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AddService {

    private commentDisable = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    addCountry(country): Observable<Country[]> {
        return this.http.post<Country[]>(apiUrl + '/country/add', country);
    }

    getCountry(): Observable<Country[]> {
        return this.http.get<Country[]>(apiUrl + '/country/get');
    }

    deleteCountry(country): Observable<Country[]> {
        return this.http.delete<Country[]>(apiUrl + '/country/' + country);
    }

    updateCountry(oldCountry: string, newCountry): Observable<Country[]> {
        return this.http.put<Country[]>(apiUrl + '/country/' + oldCountry, newCountry);
    }

    getColleges(country: string): Observable<College[]> {
        return this.http.get<College[]>(apiUrl + '/college/' + country);
    }

    addColleges(college): Observable<College[]> {
        return this.http.post<College[]>(apiUrl + '/college/add', college);
    }

    deleteCollege(college: string, country: string): Observable<College[]> {
        return this.http.delete<College[]>(apiUrl + '/college/' + country + '/' + college);
    }

    updateCollege(oldCollege: string, newCollege): Observable<College[]> {
        return this.http.put<College[]>(apiUrl + '/college/' + oldCollege, newCollege);
    }

    getDegree(): Observable<any> {
        return this.http.get(apiUrl + '/department/degrees');
    }

    addDepartment(department): Observable<Department[]> {
        return this.http.post<Department[]>(apiUrl + '/department/add', department);
    }

    getDepartments(college: string): Observable<Department[]> {
        return this.http.get<Department[]>(apiUrl + '/department/' + college);
    }

    deleteDepartment(department: string, college: string): Observable<Department[]>{
        return this.http.delete<Department[]>(apiUrl + '/department/' + department + '/' + college);
    }

    updateDepartment(department: string, newDepartment): Observable<Department[]>{
        return this.http.put<Department[]>(apiUrl + '/department/' + department, newDepartment);
    }

    getInfoValues(id: string): Observable<InfoResponse>{
        return this.http.get<InfoResponse>(apiUrl + '/department/info/' + id);
    }

    saveInfo(info: Info): Observable<InfoResponse>{
        return this.http.post<InfoResponse>(apiUrl + '/department/info', info);
    }

    getCommentValues(id: string): Observable<InfoResponse>{
        return this.http.get<InfoResponse>(apiUrl + '/department/comment/' + id);
    }

    saveComment(info: Info): Observable<InfoResponse>{
        return this.http.post<InfoResponse>(apiUrl + '/department/comment', info);
    }

    setCommentDisable(id: string): void{
        this.commentDisable.next(id);
    }

    getCommentDisable(): Observable<string>{
        return this.commentDisable.asObservable();
    }
}
