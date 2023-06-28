import {Component, OnInit} from '@angular/core';
import {AuthService} from "./modules/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'File-Fusion-Frontend';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
      const url = window.location.href;
      if (url.includes("registerAsMember")){
          this.router.navigate(['member-registration/' + url.split('/')[4] + '/' +
            url.split('/')[5]]);

      }
      else{
          const queryParams = new URLSearchParams(url.split('#')[1]);
          // Extract the id_token from the query parameters
          const idToken = queryParams.get('id_token');

          if (idToken) {
              localStorage.setItem('user', idToken);
              this.authService.setUserLogged();
          }

          if (this.authService.isLoggedIn())
              this.authService.setUserLogged();


          this.router.navigate(['home']);
      }
  }
}
