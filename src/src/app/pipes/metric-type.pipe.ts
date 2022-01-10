import { Pipe, PipeTransform } from '@angular/core';
import { MetricType } from '../models/metric-type';

@Pipe({
  name: 'metricType'
})
export class MetricTypePipe implements PipeTransform {

  transform(value: MetricType, ...args: unknown[]): unknown {
    switch (value) {
      case MetricType.Counter:
        return "Counter";
      case MetricType.Measurement:
        return "Measurement";
      default:
        return "Unknown";
    }
  }

}
