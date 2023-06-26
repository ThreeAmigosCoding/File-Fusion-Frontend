import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-member-invite',
  templateUrl: './member-invite.component.html',
  styleUrls: ['./member-invite.component.css']
})
export class MemberInviteComponent {

    membersList: string[] = ["email@example.com", "email2@example.com"]

    inviteMemberForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required])
    });
    constructor(private dialogRef: MatDialogRef<MemberInviteComponent>,
                private authService: AuthService) {
    }

    invite(email: string) {
    }

    removeMember(i: number) {
        if (!confirm("Are you sure you want to remove this member?")) return;
    }
}
