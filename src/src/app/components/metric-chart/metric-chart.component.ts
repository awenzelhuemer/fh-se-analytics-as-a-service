import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Metric } from 'src/app/models/metric';
import { MetricService } from 'src/app/services/metric.service';
import 'chartjs-adapter-moment';
import { ColorHelper } from '../../utils/color-helper';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-metric-chart',
  templateUrl: './metric-chart.component.html',
  styleUrls: ['./metric-chart.component.scss']
})
export class MetricChartComponent implements OnInit {

  @Input() editable = true;
  @Input() config!: MetricChartConfig;

  data: ChartData;
  options: ChartOptions;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(
    private metricService: MetricService,
    private dialogService: DialogService
  ) {
    this.data = {
      datasets: []
    }
    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: 'time'
        },
        'y-axis-0':
        {
          position: 'left',
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
      }
    }
  }

  ngOnInit() {
    this.metricService.filter(
      this.config.metrics.map(m => m.name),
      undefined,
      undefined,
      undefined,
      this.config.appKey,
      this.config.instanceId,
      this.config.resultCount,
      0).subscribe(result => {
        this.fillCharts(result.items);
      });
  }

  private fillCharts(metrics: Metric[]) {
    this.data.labels = metrics
    .map(m => m.createdAt);
    this.data.datasets = [];

    metrics.map(m => m.name)
      .filter(MetricChartComponent.onlyUnique)
      .forEach(name => {

        const filteredMetrics = metrics.filter(i => i.name == name);
        const chartData: (number | null)[] = [];

        this.data.labels?.forEach(createdAt => {
          // One or multiple entries with current date exist
          const metric = filteredMetrics.find(m => m.createdAt == createdAt);
          if (metric) {
            chartData.push(metric.value);
          } else { // No entry exists (Fill up with null)
            chartData.push(0);
          }
        });

        this.addDataSet(name, chartData);
      });

    this.chart?.update();
  }

  private static onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  private addDataSet(label: string, data: (number | null)[]) {
    this.data.datasets.push({
      data: data,
      label: label,
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: this.config.metrics.find(m => m.name == label)?.color ?? ColorHelper.getRandomColor(),
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    });
  }

  editChart() {
    this.dialogService.openEditMetricChartDialog(this.config)
    .afterClosed()
    .subscribe(() => this.change.emit());
  }

  removeChart() {
    this.metricService.removeChartConfig(this.config.id);
    this.change.emit();
  }
}
