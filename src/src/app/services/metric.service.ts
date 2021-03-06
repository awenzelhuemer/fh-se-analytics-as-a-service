import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DateHelper } from '../utils/date-helper';
import { Metric } from '../models/metric';
import { MetricChartConfig } from '../models/metric-chart-config';
import { MetricType } from '../models/metric-type';
import { Paging } from '../models/paging';
import { StorageService } from './storage.service';
import { Guid } from '../utils/guid-helper';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { }

  search(searchText: string | undefined) {
    return this.httpClient.get<string[]>(`${environment.apiBaseUrl}/metrics/search`, {
      params: new HttpParams().append('searchText', searchText ?? "")
    })
  }

  filter(names: string[], type: MetricType | undefined, from: Date | undefined, to: Date | undefined, appKey: string | undefined, instanceId: string | undefined, count: number, offset: number) {

    let params = new HttpParams();

    if (names.length > 0) {
      names.forEach(n => params = params.append("names", n))
    };

    params = params.append('type', type ?? "")
      .append('from', DateHelper.toIsoString(from))
      .append('to', DateHelper.toIsoString(to))
      .append('appKey', appKey ?? "")
      .append('instanceId', instanceId ?? "")
      .append('count', count)
      .append('offset', offset)

    return this.httpClient.get<Paging<Metric>>(`${environment.apiBaseUrl}/metrics`, {
      params
    });
  }

  updateChartConfig(chartConfig: MetricChartConfig) {
    const configs = this.getAllChartsConfig();
    let index = configs.findIndex(c => c.id == chartConfig.id);

    if (index > -1) {
      configs[index] = chartConfig;
    } else {
      configs.push(chartConfig);
    }

    this.storageService.set(StorageService.metricConfiguration, configs);
  }

  getAllChartsConfig() {
    return this.storageService.get<MetricChartConfig[]>(StorageService.metricConfiguration, []);
  }

  getChartConfigById(id: string) {
    const configs = this.storageService.get<MetricChartConfig[]>(StorageService.metricConfiguration, []);

    return configs.find(c => c.id === id);
  }

  removeChartConfig(id: string) {
    const configs = this.getAllChartsConfig();
    let index = configs.findIndex(c => c.id == id);

    if (index > -1) {
      delete configs[index];
    }

    this.storageService.set(StorageService.metricConfiguration, configs.filter(c => c != null));
  }

  addChartConfig(chartConfig: MetricChartConfig) {
    chartConfig.id = Guid.newGuid();
    const configs = this.getAllChartsConfig();
    configs.push(chartConfig);
    this.storageService.set(StorageService.metricConfiguration, configs);
  }
}
