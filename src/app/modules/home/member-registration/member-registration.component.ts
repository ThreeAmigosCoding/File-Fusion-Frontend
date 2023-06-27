import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit{

    memberRegistrationForm = new FormGroup({
        name: new FormControl("", [
            Validators.required,
            Validators.min(3),
            Validators.max(50),
            Validators.pattern('^[a-zA-Z0-9\-()_]+$')
        ]),
        email: new FormControl("", [Validators.email, Validators.required]),
        familyName: new FormControl("", [
            Validators.required,
            Validators.min(3),
            Validators.max(50),
            Validators.pattern('^[a-zA-Z0-9\-()_]+$')
        ]),
        address: new FormControl("", [Validators.required]),
        password: new FormControl("", [
            Validators.required,
            Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$')
        ]),
        inviterEmail: new FormControl("", [Validators.email, Validators.required]),
    })

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.memberRegistrationForm.get("inviterEmail")!.setValue(params['inviterMail']);
            this.memberRegistrationForm.get("email")!.setValue(params['recipient']);
        });
    }

    createRegistrationRequest() {

    }
}
