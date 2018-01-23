import { Injectable } from '@angular/core';
import {Device} from './Device';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DeviceDataService {

  private devicesUrl = 'https://api.sensohive.com/v1/dev?apikey=JSVAcqUGrX0UjpcN8CcyceD1sR3GQfOguq9oFe5IT5MkFb6U6mr2PAw5aktgA4WX';
  private deviceDataUrl = 'https://api.sensohive.com/v1/dev/{device}/data?from=1510900987'
  + '&apikey=JSVAcqUGrX0UjpcN8CcyceD1sR3GQfOguq9oFe5IT5MkFb6U6mr2PAw5aktgA4WX';
  constructor(private http: HttpClient) { }
  getDevices(): Observable<any>  {
    return this.http.get<any>(this.devicesUrl);
  }
  getDeviceData(deviceName: string): Observable<any> {
    return this.http.get<any>(this.deviceDataUrl.replace('{device}', deviceName));
  }


}
