import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { LogType } from 'src/app/models/log-type';
import { InstanceService } from 'src/app/services/instance.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ValidationHelper } from '../../utils/validation-helper';

@Component({
  selector: 'app-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit {

  filteredInstanceIds?: Observable<string[]>;

  filterForm: FormGroup;

  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  constructor(
    formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private instanceService: InstanceService) {
    this.filterForm = formBuilder.group({
      searchText: [undefined],
      type: [undefined],
      from: [undefined],
      to: [undefined],
      instanceId: [undefined]
    }); 
  }

  ngOnInit(): void {
    this.filteredInstanceIds = this.filterForm.get('instanceId')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loaderService.disableLoading()),
      switchMap(term => this.instanceService.search(term)),
      tap(() => this.loaderService.enableLoading())
    );
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
