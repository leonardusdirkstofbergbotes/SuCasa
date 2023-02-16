import { GoogleMapService } from './../../services/google-map.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {
  directionData$: Observable<google.maps.DirectionsResult | undefined> =
    new Observable(undefined);
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  mapScriptLoaded: boolean = false;

  constructor(
    public googleMapService: GoogleMapService
  ) {

    this.googleMapService.mapScriptLoaded.subscribe((loaded) => {
      if (loaded) this.mapScriptLoaded = true;
    })
  }
}
