import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getClients() {
    return this.httpClient.get<Client[]>(`${environment.apiBaseUrl}/clients`);
  }

  createClient() {
    return this.httpClient.post<Client>(`${environment.apiBaseUrl}/clients`, {});
  }
}
