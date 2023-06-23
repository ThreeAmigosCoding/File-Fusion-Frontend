import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    constructor(private router: Router) {
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

    signOut() {
        alert("Namestiti logout")
    }
}
