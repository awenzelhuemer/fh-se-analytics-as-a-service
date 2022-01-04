import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DateHelper } from '../components/utils/date-helper';
import { Metric } from '../models/metric';
import { MetricType } from '../models/metric-type';
import { Paging } from '../models/paging';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private httpClient: HttpClient) { }

  filter(searchText: string | undefined, type: MetricType | undefined, from: Date | undefined, to: Date | undefined, appKey: string | undefined, instanceId: string | undefined, count: number, offset: number) {
    return this.httpClient.get<Paging<Metric>>(`${environment.apiBaseUrl}/metrics`, {
      params: new HttpParams()
        .append('searchText', searchText ?? "")
        .append('type', type ?? "")
        .append('from', DateHelper.toIsoString(from))
        .append('to', DateHelper.toIsoString(to))
        .append('appKey', appKey ?? "")
        .append('instanceId', instanceId ?? "")
        .append('count', count)
        .append('offset', offset)
    });
  }
}
