import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserTableSource} from '../table/user.table.source';
import {UserService} from '../../_service/user.service';
import {tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {AddService} from '../../_service/add.service';
import {Country} from '../dto/country';
import {Alert, AlertType} from '../../dto/alert';
import {AlertService} from '../../_service/alert.service';
import {ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_USER} from '../../constant';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

    dataSource: UserTableSource;
    displayedColumns = ['email', 'pass', 'role', 'country', 'operation'];
    totalSize = 0;
    countries: Country[] = null;
    roles: string[] = [ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_USER];
    passwordControl = new RegExp('^([A-Za-z0-9]{4,20}){1}$|^$');

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private userService: UserService,
                private country: AddService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.country.getCountry().subscribe(data => {
            this.countries = data;
        }, error => {
            this.alertService.alert(new Alert('Country', 'Cannot get countries', AlertType.ERROR));
        });
        this.dataSource = new UserTableSource(this.userService);
        this.dataSource.loadUsers(null, 'asc', 0, 5);
        this.userService.getTotalSize().subscribe(data => {
            this.totalSize = data;
        });
    }

    ngAfterViewInit(): void {
        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();
    }

    loadLessonsPage(): void {
        this.dataSource.loadUsers(
            null,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    save(row): void {
        if (this.passwordControl.test(row.pass)) {
            this.userService.saveUser(row).subscribe(user => {
                this.alertService.alert(new Alert('Success', 'Changing is successful for ' + user.username, AlertType.SUCCESS));
            }, error => {
                this.alertService.alert(new Alert('Error', 'Changing is not successful for ' + row.username, AlertType.ERROR));
            });

        } else {
            this.alertService.alert(new Alert('Passsword', 'Password is not valid', AlertType.WARNING));
        }
    }

    delete(row): void {

    }

    onRoolChange(user): void {
        if (user.role !== 'ROLE_ADMIN') {
            user.country = null;
        }
    }

    compareObjects(o1: any, o2: any): boolean {
        return o1?.name === o2?.name && o1?.id === o2?.id;
    }
}
