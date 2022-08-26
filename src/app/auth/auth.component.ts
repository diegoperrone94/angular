import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from '../../../node_modules/rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService , private router :Router) { }


  onSwitchMode() {
    this.isLogin = !this.isLogin;
    this.error = null;
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      let authObs: Observable<{}|AuthResponseData>;
      this.isLoading = true;

      if (!this.isLogin)
        authObs = this.authService.signUp(email, password);
      else
        authObs = this.authService.login(email, password);


      this.isLoading = false;
      form.reset();

      authObs.subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/recipe']);
      },
        errorRes => {
          this.error = errorRes;
          this.isLoading = false;
        });

    } else return;
  }
}
