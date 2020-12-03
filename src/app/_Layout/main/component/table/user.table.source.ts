import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {UserService} from '../../_service/user.service';
import {UserTable} from '../../dto/user.table';

export class UserTableSource implements DataSource<UserTable> {

    constructor(private userService: UserService) {
    }

    private usersSubject = new BehaviorSubject<UserTable[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    connect(collectionViewer: CollectionViewer): Observable<UserTable[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(filter,
              sortDirection , pageIndex, pageSize): void {
        this.loadingSubject.next(true);
        this.userService.findUsers(filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(users => this.usersSubject.next(users));
    }

}
