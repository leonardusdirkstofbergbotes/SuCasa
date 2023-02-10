import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Address } from 'src/app/models/address';
import { KEYS } from 'src/app/configs/keys';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  locationDetails$ = new Subject<Address | null>();
  locationMap$ = new Subject<Blob | null>();


  constructor(
    private http: HttpClient
  ) { }

  getAutoLocation()  {
    if (!navigator.geolocation) return null;
    else {
      console.log('searching');
      // start loading
      navigator.geolocation.getCurrentPosition(
        success => {
          this.processLocation(success)
        }, error => {
          return null;
        }, {enableHighAccuracy: true});
    }

    return null;
  }

  getGeocodes (address: string) {
    let link = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEYS.Map}&location=${address}`;

    this.http.get(link).subscribe((locationInfo: any) => {
      let locationDetails = locationInfo.results[0].locations[0];
      let geoCodes = locationDetails.latLng;

      let country = locationDetails.adminArea1;
      let state = locationDetails.adminArea4;
      let city = locationDetails.adminArea5;
      let postal = locationDetails.postalCode;
      
      this.locationDetails$.next({
        latitude: geoCodes.lat,
        longitude: geoCodes.lng,
        country: country,
        state: state,
        city: city,
        postal: postal
      } as any);
    })
  }

  processLocation (location: GeolocationPosition) {
    let link = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${KEYS.Map}&location=${location.coords.latitude},${location.coords.longitude}`;

    this.http.get(link).subscribe((locationInfo: any) => {
      let locationDetails = locationInfo.results[0].locations[0];

      let country = locationDetails.adminArea1;
      let state = locationDetails.adminArea4;
      let city = locationDetails.adminArea5;
      let postal = locationDetails.postalCode;
      
      this.locationDetails$.next({
        latitude: location.coords.longitude,
        longitude: location.coords.longitude,
        country: country,
        state: state,
        city: city,
        postal: postal
      } as any);
    });
  }

  getMapOfLocation (latitude: number, longitude: number, zoom: number = 9) {
    let link = `https://www.mapquestapi.com/staticmap/v5/map?key=${KEYS.Map}&center=${latitude},${longitude}&size=300,300&zoom=${zoom}`;

    this.http.get(link, { responseType: 'blob' }).subscribe((mapData: any) => {
      this.locationMap$.next(mapData);
    })
  }
}

