import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FamilyMemberService} from "../family-member.service";
import {FamilyMember} from "../../../model/family-member";

@Component({
  selector: 'app-member-invite',
  templateUrl: './member-invite.component.html',
  styleUrls: ['./member-invite.component.css']
})
export class MemberInviteComponent {

    membersList: FamilyMember[] = []

    pendingMembers: FamilyMember[] = []

    inviteMemberForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required])
    });
    constructor(private dialogRef: MatDialogRef<MemberInviteComponent>,
                private authService: AuthService, private familyMemberService: FamilyMemberService) {
    }

    invite(email: string) {
        this.familyMemberService.inviteMember(email, this.authService.getUserMail()).subscribe({
           next: value => alert(value.message),
           error: err => alert(err.message)
        });
        this.dialogRef.close();
    }

    removeMember(i: number) {
        if (!confirm("Are you sure you want to remove this member?")) return;
    }

    manageRequest(request_id: string, action: string) {
        this.familyMemberService.manageRequest(request_id, action).subscribe({
           next: value => {
               alert(value.message);
               this.familyMemberService.getAllCurrentMembers(this.authService.getUserMail()).subscribe({
                  next: currentMembers => this.membersList = currentMembers,
                  error: err => alert(err.message)
               });
               this.familyMemberService.getAllPendingMembers(this.authService.getUserMail()).subscribe({
                   next: pendingMembers => this.pendingMembers = pendingMembers,
                   error: err => alert(err.message)
               });
           },
           error: err => {
               alert(err.message);
           }
        });
    }
}
