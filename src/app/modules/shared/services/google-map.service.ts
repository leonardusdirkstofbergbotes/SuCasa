import { ScriptInjectorService } from './script-injector.service';
import { Injectable } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  directionsResults$: Observable<google.maps.DirectionsResult | undefined> = new Observable();
  mapScriptLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private scriptInjectService: ScriptInjectorService,
    private mapDirectionsService: MapDirectionsService
  ) {
    this.scriptInjectService.load('googlemaps').then(() => {
      this.mapScriptLoaded.next(true);
    });
  }

  getRoute(): Observable<google.maps.DirectionsResult | undefined> {
    console.log('get route triggered');
    const request: google.maps.DirectionsRequest = {
      destination: "Sir Lowry's Pass Road, Somerset West, Cape Town, 7130",
      origin: 'Libri Ln, Audas Estate, Cape Town, 7130',
      travelMode: google.maps.TravelMode.DRIVING,
    };

    const directionsResults = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));

    this.directionsResults$ = directionsResults;

    return directionsResults
  }
}
