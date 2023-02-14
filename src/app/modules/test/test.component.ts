import { WhatsappService } from './../shared/services/whatsapp.service';
import { Component } from '@angular/core';
import { DeliveryMethod } from 'src/app/enums/DeliveryMethod';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor (
    private whatsappService: WhatsappService
  ) {}

  public sendWhatsApp () {
    this.whatsappService.orderRecieved([], DeliveryMethod.COLLECTION, '434342-5454-77656');
  }
}
