import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LogType } from 'src/app/models/log-type';
import { InstanceService } from 'src/app/services/instance.service';
import { ValidationHelper } from '../utils/validation-helper';

@Component({
  selector: 'app-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit {

  instances: string[] = [];
  filteredInstances!: Observable<string[]>;

  filterForm: FormGroup;

  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  constructor(
    formBuilder: FormBuilder,
    private instanceService: InstanceService) {
    this.filterForm = formBuilder.group({
      searchText: [undefined],
      type: [undefined],
      from: [undefined],
      to: [undefined],
      instance: [undefined]
    }); 
  }

  ngOnInit(): void {
    this.filteredInstances = this.filterForm.get('instance')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = value.toLowerCase();

        return this.instances.filter(instance => instance.toLowerCase().includes(filterValue));
      })
    );

    this.instanceService.findAllInstances().subscribe(i => this.instances = i.map(i => i.instanceId));
  }

  get logTypes() {
    return [undefined, LogType.Error, LogType.Trace, LogType.Warning];
  }

  getErrorMessage(control?: AbstractControl | null) {
    return ValidationHelper.getErrorMessage(control);
  }

  submit() {
    this.filterChange.emit(this.filterForm.value);
  }
}
