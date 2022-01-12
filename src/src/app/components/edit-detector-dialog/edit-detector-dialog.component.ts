import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionType } from 'src/app/models/action-type';
import { AggregateOperation } from 'src/app/models/aggregate-operation';
import { CompareType } from 'src/app/models/compare-type';
import { Detector } from 'src/app/models/detector';
import { Action } from 'src/app/models/action';
import { IntervalDetector } from 'src/app/models/interval-detector';
import { MinMaxDetector } from 'src/app/models/min-max-detector';
import { DetectorService } from 'src/app/services/detector.service';
import { ValidationHelper } from 'src/app/utils/validation-helper';
import { NumberHelper } from 'src/app/utils/number-helper';
import { Interval } from 'src/app/models/interval';

@Component({
  selector: 'app-edit-detector-dialog',
  templateUrl: './edit-detector-dialog.component.html',
  styleUrls: ['./edit-detector-dialog.component.scss']
})
export class EditDetectorDialogComponent implements OnInit {

  detector?: Detector;
  editForm?: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditDetectorDialogComponent>,
    private formBuilder: FormBuilder,
    private detectorService: DetectorService,
    @Inject(MAT_DIALOG_DATA) private detectorId?: number
  ) { }

  ngOnInit(): void {
    if (this.detectorId) {
      this.detectorService.findById(this.detectorId).subscribe(detector => {
        this.detector = detector;
        this.initForm();
      });
    } else {
      this.detector = <Detector>{
        id: 0,
        activated: true,
        action: <Action>{ id: 0 },
        intervalDetector: <IntervalDetector>{ id: 0 }
      };
      this.initForm();
    }
  }

  initForm() {
    if (this.detector) {
      this.editForm = this.formBuilder.group({
        id: [this.detector.id],
        action: this.formBuilder.group({
          id: [this.detector.action.id],
          type: [this.detector.action.type, Validators.required],
          endpoint: [this.detector.action.endpoint, Validators.required]
        }),
        metricName: [this.detector.metricName, Validators.required],
        interval: [this.detector.interval, Validators.required],
        offset: [this.detector.offset, Validators.required],
        activated: [this.detector.activated, Validators.required],
        lastExecuted: [this.detector.lastExecuted],
        minMaxDetector: this.detector.minMaxDetector ? this.formBuilder.group({
          id: [this.detector.minMaxDetector?.id],
          lowerThreshold: [this.detector.minMaxDetector?.lowerThreshold, Validators.required],
          upperThreshold: [this.detector.minMaxDetector?.upperThreshold, Validators.required],
          maxHits: [this.detector.minMaxDetector?.maxHits, Validators.required],
        }) : null,
        intervalDetector: this.detector.intervalDetector ? this.formBuilder.group({
          id: [this.detector.intervalDetector?.id],
          compareType: [this.detector.intervalDetector?.compareType, Validators.required],
          aggregateOperation: [this.detector.intervalDetector?.aggregateOperation, Validators.required],
          threshold: [this.detector.intervalDetector?.threshold, Validators.required],
        }) : null
      });
      this.setActionEndpointValidators(this.detector.action.type);

      const actionTypeControl = this.editForm.get('action.type');
      if (actionTypeControl) {
        actionTypeControl.valueChanges.subscribe((value: ActionType) => {
          this.setActionEndpointValidators(value);
        });
      }
    }
  }

  private setActionEndpointValidators(type: ActionType) {
    if (type == ActionType.Email) {
      this.editForm?.get('action.endpoint')?.addValidators(Validators.email);
    } else {
      this.editForm?.get('action.endpoint')?.removeValidators(Validators.email);
    }
    this.editForm?.get('action.endpoint')?.updateValueAndValidity();
  }

  get aggregateOperations() {
    return [
      AggregateOperation.Average,
      AggregateOperation.CurrentValue,
      AggregateOperation.Max,
      AggregateOperation.Min,
      AggregateOperation.Sum];
  }

  get compareTypes() {
    return [
      CompareType.Smaller,
      CompareType.Greater];
  }

  get actionTypes() {
    return [
      ActionType.Webhook,
      ActionType.Email];
  }

  submit() {
    const detector: Detector = {...this.editForm?.value,
      lastExecuted: this.detector?.id == 0 ? new Date() : this.detector?.lastExecuted
    };

    if(detector.id == 0) {
      this.detectorService.insert(detector).subscribe(() => this.dialogRef.close());
    } else {
      this.detectorService.update(detector).subscribe(() => this.dialogRef.close());
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  changeType() {
    if (this.detector) {
      if (this.detector?.intervalDetector) {
        this.detector.minMaxDetector = <MinMaxDetector>{ id: 0 };
        this.detector.intervalDetector = undefined;
      } else {
        this.detector.intervalDetector = <IntervalDetector>{ id: 0 };
        this.detector.minMaxDetector = undefined;
      }
      this.initForm();
      console.log(this.editForm?.get('minMaxDetector')?.value)
    }
  }

  getErrorMessage(control?: AbstractControl | null) {
    return ValidationHelper.getErrorMessage(control);
  }
}
