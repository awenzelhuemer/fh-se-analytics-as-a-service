import { Component, OnInit } from '@angular/core';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';

@Component({
  selector: 'app-metric-dashboard',
  templateUrl: './metric-dashboard.component.html',
  styleUrls: ['./metric-dashboard.component.scss']
})
export class MetricDashboardComponent implements OnInit {

  chartConfigurations: MetricChartConfig[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chartConfigurations.push({
      name: "Ping test ANDI-NB (roundtrip)",
      instanceId: "ANDI-NB",
      metricName: "%roundtrip",
      resultCount: 50
    });

    this.chartConfigurations.push({
      name: "Ping test ANDI-NB (failures)",
      instanceId: "ANDI-NB",
      metricName: "%average.failure",
      resultCount: 50
    });
  }

}
