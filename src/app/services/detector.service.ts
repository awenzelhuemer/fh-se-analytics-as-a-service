import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Detector } from '../models/detector';

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private httpClient: HttpClient) { }

  getDetectors() {
    return this.httpClient.get<Detector[]>(`${environment.apiBaseUrl}/detectors`);
  }
}
