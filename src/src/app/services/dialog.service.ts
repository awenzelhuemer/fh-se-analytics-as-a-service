import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from '../components/add-client-dialog/add-client-dialog.component';
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

  openAddDetectorDialog() {
    return this.dialog.open(EditDetectorDialogComponent, { width: DialogService.defaultWidth });
  }

  openAddClientDialog() {
    return this.dialog.open(AddClientDialogComponent, { width: "500px" });
  }

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
