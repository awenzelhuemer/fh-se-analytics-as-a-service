import { HttpClient, HttpParams } from '@angular/common/http';
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

  search(searchText: string | undefined) {
    return this.httpClient.get<string[]>(`${environment.apiBaseUrl}/instances/search`, {
      params: new HttpParams().append('searchText', searchText ?? "")
    })
  }
}
