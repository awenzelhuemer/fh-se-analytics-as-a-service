import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, empty, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MetricChartConfig } from 'src/app/models/metric-chart-config';
import { MetricChartSize } from 'src/app/models/metric-chart-size';
import { InstanceService } from 'src/app/services/instance.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MetricService } from 'src/app/services/metric.service';
import { ValidationHelper } from '../../utils/validation-helper';

@Component({
  selector: 'app-edit-metric-chart-dialog',
  templateUrl: './edit-metric-chart-dialog.component.html',
  styleUrls: ['./edit-metric-chart-dialog.component.scss']
})
export class EditMetricChartDialogComponent {

  form: FormGroup;
  filteredNames: Observable<string[]>[] = [];
  filteredInstanceIds?: Observable<string[]>;

  constructor(
    private dialogRef: MatDialogRef<EditMetricChartDialogComponent>,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private metricService: MetricService,
    private instanceService: InstanceService,
    @Inject(MAT_DIALOG_DATA) private config?: MetricChartConfig
  ) {
    this.form = formBuilder.group({
      id: [config?.id],
      name: [config?.name, Validators.required],
      size: [config?.size ?? this.chartSizes[0], Validators.required],
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

    this.filteredInstanceIds = this.form.get('instanceId')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loaderService.disableLoading()),
      switchMap(term => this.instanceService.search(term)),
      tap(() => this.loaderService.enableLoading())
    );

    this.setSearchFilter();
  }

  get metricArray() {
    return this.form.get('metrics') as FormArray;
  }

  get metricControls() {
    return this.metricArray.controls as FormGroup[];
  }

  get chartSizes() {
    return [
      MetricChartSize.HalfWidth,
      MetricChartSize.FullWidth];
  }

  addMetric() {
    const metric = this.formBuilder.group({
      name: [undefined, Validators.required],
      color: [undefined, Validators.required]
    });
    this.metricArray.push(metric);
    this.setSearchFilter();
  }

  private setSearchFilter() {
    this.metricControls.map(m => m.get('name') as FormControl).forEach((control, index) => {
      this.filteredNames[index] = control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.loaderService.disableLoading()),
        switchMap(term => this.metricService.search(term)),
        tap(() => this.loaderService.enableLoading())
      );
    });
  }

  deleteMetric(metricIndex: number) {
    this.metricArray.removeAt(metricIndex);
    this.setSearchFilter();
  }

  get isAdd() {
    return this.config == undefined;
  }

  getErrorMessage(control?: AbstractControl | null) {
    return ValidationHelper.getErrorMessage(control);
  }

  submit() {
    const config: MetricChartConfig = this.form.value;

    if (this.isAdd) {
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
