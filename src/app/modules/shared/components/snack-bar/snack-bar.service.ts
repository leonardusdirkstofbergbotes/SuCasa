import { AlertMessage } from './../../../../models/alertMessage';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertTypes } from 'src/app/enums/AlertTypes';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  message: Subject<AlertMessage> = new Subject();

  public showMessage (message: string, type: AlertTypes) {
    this.message.next({
      message: message,
      type: type,
      link: undefined
    });
  }
}
