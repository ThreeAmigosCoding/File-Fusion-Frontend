import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MultimediaMetadata} from "../../../model/multimedia";
import {AuthService} from "../../auth/auth.service";
import {ShareService} from "../share.service";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit{

    emailList: string[] = []
    members: string[] = []

    inviteForm = new FormGroup({
        email: new FormControl('', Validators.email)
    });

    constructor(private dialogRef: MatDialogRef<ShareComponent>,
                @Inject(MAT_DIALOG_DATA) public content: any,
                private authService: AuthService, private shareService: ShareService) {

    }

    ngOnInit() {
        this.shareService.getSharedUsers(this.authService.getUserMail(), this.content.id)
            .subscribe({
                next: value => {
                    this.members = value;
                },
                error: err => alert(err.error.message)
            });
    }

    share() {
        this.shareService.share(this.authService.getUserMail(), this.content.id, this.content.type, this.emailList)
            .subscribe({
                next: value => {
                    alert(value.message)
                    this.dialogRef.close()
                },
                error: err => alert(err.error.message)
            });
    }

    addEmail(email: string) {
        if(email == '') return;
        if (this.emailList.includes(email)) return;
        this.emailList.push(email)
        this.inviteForm.get('email')!.setValue('');
    }

    removeEmail(i: number) {
        this.emailList.splice(i, 1);
    }

    removeMember(i: number) {
        if (!confirm("Are you sure you want to stop sharing this file with " + this.members[i] + "?")) return;
        this.shareService.removeSharePermissions(this.authService.getUserMail(), this.members[i], this.content.id)
            .subscribe({
                next: value => {
                    alert(value.message)
                    this.members.splice(i, 1);
                },
                error: err => alert(err.error.message)
            });
    }
}
