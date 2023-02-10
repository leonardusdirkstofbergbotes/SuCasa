import { AuthService } from './../../shared/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: FormControl = new FormControl("", [Validators.email, Validators.required, Validators.maxLength(50)]);
  loading: boolean = false;

  constructor (private authService: AuthService) {}

  resetPassword () {
    if (this.email.valid) this.authService.resetPassword(this.email.value);
    else this.email.markAsTouched();
  }
}
