import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log';
import { LogType } from '../models/log-type';
import { Paging } from '../models/paging';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient: HttpClient) { }

  filter(searchText: string | undefined, type: LogType | undefined, from: Date | undefined, to: Date | undefined, appKey: string | undefined, instanceId: string | undefined, count: number, offset: number) {
    return this.httpClient.get<Paging<Log>>(`${environment.apiBaseUrl}/logs`, {
      params: new HttpParams()
        .append('searchText', searchText ?? "")
        .append('type', type ?? "")
        .append('from', LogService.prepareDate(from))
        .append('to', LogService.prepareDate(to))
        .append('appKey', appKey ?? "")
        .append('instanceId', instanceId ?? "")
        .append('count', count)
        .append('offset', offset)
    });
  }

  private static prepareDate(value?: Date): string{
    return value?.toISOString() ?? "";
  }
}
