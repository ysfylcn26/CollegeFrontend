import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserTable} from '../dto/user.table';
import {User} from '../dto/user';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private totalSize = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient) {
    }

    getTotalSize(): Observable<number>{
        return this.totalSize.asObservable();
    }

    findUsers(
        filter , sortOrder,
        pageNumber, pageSize): Observable<UserTable[]> {

        return this.http.get(apiUrl + '/user/get', {
            params: new HttpParams()
                .set('filter', filter)
                .set('sort', sortOrder)
                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())
        }).pipe(
            map(res => {
                const size = 'totalElements';
                this.totalSize.next(res[size]);
                const key = 'content';
                return res[key];
            })
        );
    }

    saveUser(user: UserTable): Observable<UserTable>{
        return this.http.post<UserTable>(apiUrl + '/user/save', user);
    }

    getResponsibility(): Observable<any>{
        return this.http.get(apiUrl + '/user/responsibility');
    }
}
