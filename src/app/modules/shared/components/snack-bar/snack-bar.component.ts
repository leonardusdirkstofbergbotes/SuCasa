import { AlertMessage } from './../../../../models/alertMessage';
import { SnackBarService } from './snack-bar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  alertInfo: AlertMessage | undefined;
  messageVisibleTime: number = 3500;
  progressBarWidth: number = 0;

  constructor (snackBarService: SnackBarService) {
    snackBarService.message.subscribe((alertInfo: AlertMessage) => {
      this.showMessage(alertInfo);
    })
  }

  showMessage (alertInfo: AlertMessage) {
    this.alertInfo = alertInfo;
    
    let progressCounter = setInterval(() => {
      this.progressBarWidth += 1;
    }, this.messageVisibleTime / 100);
    
    setTimeout(() => {
      clearInterval(progressCounter);
      this.alertInfo = undefined;
      this.progressBarWidth = 0;
    }, this.messageVisibleTime)
  }
}
