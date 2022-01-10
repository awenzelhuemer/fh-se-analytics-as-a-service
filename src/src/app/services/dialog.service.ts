import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDetectorDialogComponent } from '../components/edit-detector-dialog/edit-detector-dialog.component';
import { EditMetricChartDialogComponent } from '../components/edit-metric-chart-dialog/edit-metric-chart-dialog.component';

import { MetricChartConfig } from '../models/metric-chart-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  static readonly defaultWidth = "650px";

  constructor(
    private dialog: MatDialog
  ) { }

  openEditDetectorDialog(detectorId: number) {
    return this.dialog.open(EditDetectorDialogComponent, { data: detectorId, width: DialogService.defaultWidth });
  }

  openAddMetricChartDialog() {
    return this.dialog.open(EditMetricChartDialogComponent, { width: DialogService.defaultWidth });
  }

  openEditMetricChartDialog(config: MetricChartConfig) {
    return this.dialog.open(EditMetricChartDialogComponent, { data: config, width: DialogService.defaultWidth });
  }
}
