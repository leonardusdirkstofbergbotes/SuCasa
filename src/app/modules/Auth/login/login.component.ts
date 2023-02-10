import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
  });

  loading: boolean = false;

  constructor(private authService: AuthService) { }

  login () {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.loginWithEmailAndPassword(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    }
    else this.loginForm.markAllAsTouched();
    
    this.loading = false;
  }
}
