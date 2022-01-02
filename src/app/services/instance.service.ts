import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instance } from '../models/instance';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(private httpClient: HttpClient) { }

  findAllInstances() {
    return this.httpClient.get<Instance[]>(`${environment.apiBaseUrl}/instances`);
  }
}
