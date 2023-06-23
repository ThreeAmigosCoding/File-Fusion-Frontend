import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    user: string = "";

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.userLoggedState$.subscribe({
           next: value => this.user = value
        });
    }


}
