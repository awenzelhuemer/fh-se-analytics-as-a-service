import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private metricService: MetricService,
    @Inject(MAT_DIALOG_DATA) private config?: MetricChartConfig
    ) {
      this.form = formBuilder.group({
        id: [config?.id],
        name: [config?.name, Validators.required],
        metrics: formBuilder.array(
          this.config?.metrics?.map(item => this.formBuilder.group({
            name: [item.name, Validators.required],
            color: [item.color, Validators.required]
          })) ?? []
        ),
        appKey: [config?.appKey],
        instanceId: [config?.instanceId],
        resultCount: [config?.resultCount, Validators.required]
      });
    }

  ngOnInit(): void {
  }

  get metricArray() {
    return this.form.get('metrics') as FormArray;
  }

  get metricControls() {
    return this.metricArray.controls as FormGroup[];
  }

  addMetric() {
    const metric = this.formBuilder.group({
      name: [undefined, Validators.required],
      color: [undefined, Validators.required]
    });
    this.metricArray.push(metric);
  }

  deleteMetric(metricIndex: number) {
    this.metricArray.removeAt(metricIndex);
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
