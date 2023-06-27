import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MemberInviteComponent} from "../../home/member-invite/member-invite.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

    user: string = "";

    constructor(private router: Router, private authService: AuthService,
                public membersDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authService.userLoggedState$.subscribe({
           next: value => {
               this.user = value;
           }
        });

    }

    home() {
        this.router.navigate(['home']);
    }

    albums() {
        this.router.navigate(['albums']);
    }

    sharedWithMe() {
        this.router.navigate(['shared-with-me']);
    }

    members() {
        this.membersDialog.open(MemberInviteComponent);
    }

    signOut() {
        this.authService.logOut();
    }

    login() {
        this.authService.goToCognitoLogin();
    }
}
