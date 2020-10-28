import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AddService} from '../../../_service/add.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AlertService} from '../../../_service/alert.service';
import {Alert, AlertType} from '../../../dto/alert';
import {Info} from '../../../dto/info';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

    formComment: FormGroup;
    idSubscription: Subscription;
    id: string = null;
    name: string = null;

    constructor(private fb: FormBuilder,
                private addService: AddService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.formComment = this.fb.group({
            comment: new FormControl(null)
        });
        this.idSubscription = this.addService.getCommentDisable().subscribe(data => {
            if (data) {
                this.id = data;
                this.addService.getCommentValues(data).subscribe(infos => {
                    this.name = infos.name + ' - ' + infos.degree;
                    this.formComment.get('comment').setValue(infos.info);
                }, error => {
                    this.alert.alert(new Alert('Error', 'We cannot get note and fee', AlertType.ERROR));
                    this.id = null;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.idSubscription.unsubscribe();
    }

    submit(): void {
        if (this.id) {
            const info = new Info({id: this.id, info: this.formComment.get('comment').value?.trim()});
            this.addService.saveComment(info).subscribe(infos => {
                this.name = infos.name + ' - ' + infos.degree;
                this.formComment.get('comment').setValue(infos.info);
                this.alert.alert(new Alert('Success', 'Comment is successfull', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'We cannot get note and fee', AlertType.ERROR));
                this.id = null;
            });
        }

    }
}
