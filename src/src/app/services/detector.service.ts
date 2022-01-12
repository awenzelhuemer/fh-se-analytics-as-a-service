import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Detector } from '../models/detector';

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Detector[]>(`${environment.apiBaseUrl}/detectors`);
  }

  findById(id: number) {
    return this.httpClient.get<Detector | undefined>(`${environment.apiBaseUrl}/detectors/${id}`);
  }

  insert(detector: Detector){
    return this.httpClient.post(`${environment.apiBaseUrl}/detectors`, JSON.stringify(detector), {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    });
  }

  delete(id: number){
    return this.httpClient.delete(`${environment.apiBaseUrl}/detectors/${id}`);
  }

  update(detector: Detector){
    return this.httpClient.put(`${environment.apiBaseUrl}/detectors`, JSON.stringify(detector), {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    });
  }
}
