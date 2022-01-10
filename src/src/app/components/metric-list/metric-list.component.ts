import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';
import { Metric } from 'src/app/models/metric';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';
import { MetricService } from 'src/app/services/metric.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-metric-list',
  templateUrl: './metric-list.component.html',
  styleUrls: ['./metric-list.component.scss']
})
export class MetricListComponent implements OnInit, AfterViewInit {

  config?: MetricChartConfig;

  metrics: Metric[] = [];
  resultsLength = 0;
  itemsPerPage = 10;

  displayedColumns: string[] = ['type', 'createdAt', 'instanceId', 'name', 'value', 'start', 'end'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private metricService: MetricService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const configId = param.get('configId') ?? undefined;
      if (configId) {
        this.config = this.metricService.getChartConfigById(configId);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.config) {
      this.loadData();
    } else {
      this.messageService.showErrorMessage({status: 404});
    }
  }

  loadData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.metricService.filter(
          this.config?.metrics.map(m => m.name) ?? [],
          undefined,
          undefined,
          undefined,
          this.config?.appKey,
          this.config?.instanceId,
          this.paginator.pageSize,
          this.paginator.pageIndex)
        )).subscribe(data => {
          this.resultsLength = data.count;
          this.metrics = data.items;
        });
  }

  goBack() {
    this.location.back();
  }

}
