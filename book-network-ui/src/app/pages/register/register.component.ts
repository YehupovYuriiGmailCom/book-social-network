import {Component} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  resiterRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''}
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  protected register() {
    this.errorMsg = [];
    this.authService.register(
      {
        body: this.resiterRequest
      }
    ).subscribe(
      {
        next: () => {
          this.router.navigate(['activate-account'])
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      })
  }

  protected login() {
    this.router.navigate(['login'])

  }
}
