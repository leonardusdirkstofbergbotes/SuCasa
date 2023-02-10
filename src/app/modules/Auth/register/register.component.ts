import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
  });

  loading: boolean = false;

  constructor(private _auth: AuthService) { }

  async register () {
    if (this.registerForm.valid) {
      this.loading = true;
      await this._auth.registerNewUser(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value);
    }
    else this.registerForm.markAllAsTouched();

    this.loading = false;
  }
}
