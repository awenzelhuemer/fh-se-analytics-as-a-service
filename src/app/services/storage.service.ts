import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static readonly metricConfiguration: string = "METRIC_CHART_CONFIGURATION";

  constructor() { }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string, fallbackValue: T): T {
    const item = localStorage.getItem(key);

    if(item){
      return JSON.parse(item);
    } else {
      return fallbackValue;
    }
  }
}
