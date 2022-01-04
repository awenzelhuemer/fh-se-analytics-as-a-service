import { Pipe, PipeTransform } from '@angular/core';
import { MetricChartSize } from '../models/metric-chart-size';

@Pipe({
  name: 'metricChartSize'
})
export class MetricChartSizePipe implements PipeTransform {

  transform(value: MetricChartSize, ...args: unknown[]): string {
    switch (value) {
      case MetricChartSize.HalfWidth:
        return "Half width";
      case MetricChartSize.FullWidth:
        return "Full width";
      default:
        return "Unknown"
    }
  }

}
