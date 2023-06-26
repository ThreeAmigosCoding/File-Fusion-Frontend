import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {clientId, domain, region} from "../../../../credentials";
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    userLogged$ = new BehaviorSubject<string>("");
    userLoggedState$ = this.userLogged$.asObservable();

    constructor() { }

    goToCognitoLogin() {
        const redirectUri = encodeURIComponent('http://localhost:4200/');

        const url = `https://${domain}.auth.${region}.amazoncognito.com/login?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

        window.location.href = url;
    }

    logOut(){
        localStorage.removeItem("user");
        this.setUserLogged();
        const redirectUri = encodeURIComponent('http://localhost:4200/');

        const url = `https://${domain}.auth.${region}.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

        window.location.href = url;
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('user') != null;
    }

    checkTokenValidity(){
        if (this.isLoggedIn()) {
            const accessTokenString: any = localStorage.getItem('user');
            const helper = new JwtHelperService();

            if (helper.isTokenExpired(accessTokenString)) {
                localStorage.removeItem("user");
                this.setUserLogged();
                window.location.href = "http://localhost:4200/";
            }
        }

    }

    setUserLogged(): void {
        this.userLogged$.next(this.getUserMail());
    }

    getUserMail(): string {
        if (this.isLoggedIn()) {
            const accessTokenString: any = localStorage.getItem('user');
            const accessToken = accessTokenString; // Assign the JWT string directly
            const helper = new JwtHelperService();
            return helper.decodeToken(accessToken).email;
        }
        return '';
    }
}
