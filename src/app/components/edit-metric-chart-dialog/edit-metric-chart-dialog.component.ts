import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';
import { MetricService } from 'src/app/services/metric.service';
import { ValidationHelper } from '../../utils/validation-helper';

@Component({
  selector: 'app-edit-metric-chart-dialog',
  templateUrl: './edit-metric-chart-dialog.component.html',
  styleUrls: ['./edit-metric-chart-dialog.component.scss']
})
export class EditMetricChartDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditMetricChartDialogComponent>,
    formBuilder: FormBuilder,
    private metricService: MetricService,
    @Inject(MAT_DIALOG_DATA) private config?: MetricChartConfig
    ) {
      this.form = formBuilder.group({
        id: [config?.id],
        name: [config?.name, Validators.required],
        appKey: [config?.appKey],
        instanceId: [config?.instanceId],
        metricName: [config?.metricName],
        resultCount: [config?.resultCount, Validators.required]
      });
    }

  ngOnInit(): void {
  }

  get isAdd() {
    return this.config == undefined;
  }

  getErrorMessage(control?: AbstractControl | null) {
    return ValidationHelper.getErrorMessage(control);
  }

  submit() {
    const config: MetricChartConfig = this.form.value;

    if(this.isAdd){
      this.metricService.addChartConfig(config);
    } else {
      this.metricService.updateChartConfig(config);
    }
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
