import { AuthService } from './../../services/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-third-party-auth',
  templateUrl: './third-party-auth.component.html',
  styleUrls: ['./third-party-auth.component.scss']
})
export class ThirdPartyAuthComponent {

  @Output() authBusy: EventEmitter<boolean> = new EventEmitter();

  constructor (private authService: AuthService) {}

  async auth (service: string) {
    this.authBusy.emit(true);
    if (service == 'google') await this.authService.loginWithGoogle();
    else if (service == 'facebook') await this.authService.loginWithFacebook();
    else if (service == 'microsoft') await this.authService.loginWithMicrosoft(); // TODO: Not working
    
    this.authBusy.emit(false);
  }
}
