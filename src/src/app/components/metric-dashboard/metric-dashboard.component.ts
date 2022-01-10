import { Component, Input, OnInit } from '@angular/core';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';
import { MetricChartSize } from 'src/app/models/metric-chart-size';
import { DialogService } from 'src/app/services/dialog.service';
import { MetricService } from 'src/app/services/metric.service';

@Component({
  selector: 'app-metric-dashboard',
  templateUrl: './metric-dashboard.component.html',
  styleUrls: ['./metric-dashboard.component.scss']
})
export class MetricDashboardComponent implements OnInit {

  chartConfigurations: MetricChartConfig[] = [];

  @Input() showTitle = true;
  @Input() editable = true;

  constructor(
    private metricService: MetricService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadChartConfigurations();
  }

  loadChartConfigurations() {
    this.chartConfigurations = this.metricService.getAllChartsConfig();
  }

  addChart() {
    this.dialogService.openAddMetricChartDialog()
      .afterClosed()
      .subscribe(() => this.loadChartConfigurations());
  }

  getSize(config: MetricChartConfig) {
    switch (config.size) {
      case MetricChartSize.HalfWidth:
        return "col-12 col-md-6";
      case MetricChartSize.FullWidth:
        return "col-12";
      default:
        return "col-auto";
    }
  }
}
