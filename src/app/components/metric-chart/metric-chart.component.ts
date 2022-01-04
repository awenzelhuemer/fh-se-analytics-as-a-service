import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Metric } from 'src/app/models/metric';
import { MetricService } from 'src/app/services/metric.service';
import 'chartjs-adapter-moment';
import { ColorHelper } from '../utils/color-helper';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';

@Component({
  selector: 'app-metric-chart',
  templateUrl: './metric-chart.component.html',
  styleUrls: ['./metric-chart.component.scss']
})
export class MetricChartComponent implements OnInit {

  @Input() config!: MetricChartConfig;

  data: ChartConfiguration['data'];
  options: ChartConfiguration['options'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private metricService: MetricService
  ) {
    this.data = {
      datasets: []
    }
    this.options = {
      scales: {
        x: {
          type: 'time'
        },
        'y-axis-0':
        {
          position: 'left',
        },
        'y-axis-1': {
          position: 'right',
          grid: {
            color: 'gray',
          },

          ticks: {
            color: 'white'
          }
        }
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
      this.config.metricName,
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
    this.data.labels = metrics.map(m => m.createdAt);
    this.data.datasets = [];

    const names = metrics.map(m => m.name).filter(MetricChartComponent.onlyUnique);

    console.log(names);

    names.forEach(name => {
      
      const filteredMetrics = metrics.filter(i => i.name == name);
      const chartData: number[] = [];

      metrics.forEach(metric => {
        // One or multiple entries with current date exist
        if (filteredMetrics.some(m => m.createdAt == metric.createdAt)) {
          chartData.push(metric.value);
        } else { // No entry exists (Fill up with zeros)
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

  private addDataSet(label: string, data: number[]) {
    this.data.datasets.push({
      data: data,
      label: label,
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: ColorHelper.getRandomColor(),
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    });
  }
}
