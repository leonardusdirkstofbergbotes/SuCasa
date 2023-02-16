import { GoogleMapService } from './../shared/services/google-map.service';
import { WhatsappService } from './../shared/services/whatsapp.service';
import { Component } from '@angular/core';
import { DeliveryMethod } from 'src/app/enums/DeliveryMethod';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  constructor (
    private whatsappService: WhatsappService,
    private googleMapService: GoogleMapService
  ) {}

  public sendWhatsApp () {
    this.whatsappService.orderRecieved([], DeliveryMethod.COLLECTION, '434342-5454-77656');
  }

  public getRoute () {
    this.googleMapService.getRoute().subscribe(data => {
      console.log(data);
    })
  }
}
