import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FamilyMemberService} from "../family-member.service";

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

    constructor(private route: ActivatedRoute, private familyMemberService: FamilyMemberService,
                private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.memberRegistrationForm.get("inviterEmail")!.setValue(params['inviterMail']);
            this.memberRegistrationForm.get("email")!.setValue(params['recipient']);
        });
    }

    createRegistrationRequest() {
        if (!this.memberRegistrationForm.valid) return;

        let registrationInfo = {
            email: String(this.memberRegistrationForm.value.email),
            password: String(this.memberRegistrationForm.value.password),
            name: String(this.memberRegistrationForm.value.name),
            family_name: String(this.memberRegistrationForm.value.familyName),
            address: String(this.memberRegistrationForm.value.address)
        }

        this.familyMemberService.createRequest(registrationInfo,
            String(this.memberRegistrationForm.value.inviterEmail)).subscribe({
            next: value => {
                alert(value.message);
                this.router.navigate(['home']);
            },
            error: err => alert(err.message)
        });
    }
}
