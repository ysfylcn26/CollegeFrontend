import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../_service/auth.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ROLE_SUPER_ADMIN} from '../../constant';
import {AddService} from '../../_service/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  private signStatus: Subscription;
  private role: Subscription;
  private commentDisable: Subscription;
  superadmin = false;
  statu = false;
  comment: string = null;

  constructor(private authService: AuthService, private addService: AddService) { }

  ngOnInit(): void {
    this.signStatus = this.authService.getSignStatus().subscribe( data => {
      this.statu = data;
    });
    this.role = this.authService.getRoleValue().subscribe( data => {
      if(data === ROLE_SUPER_ADMIN) {
        this.superadmin = true;
      }
    });
    this.commentDisable = this.addService.getCommentDisable().subscribe(data => {
      this.comment = data;
    });
  }

  ngOnDestroy(): void{
    this.signStatus.unsubscribe();
    this.role.unsubscribe();
    this.commentDisable.unsubscribe();
  }
}
