import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Instance } from 'src/app/models/instance';
import { Log } from 'src/app/models/log';
import { LogType } from 'src/app/models/log-type';
import { InstanceService } from 'src/app/services/instance.service';
import { LogService } from 'src/app/services/log.service';
import { ValidationHelper } from '../utils/validation-helper';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit, AfterViewInit {

  logs: Log[] = [];
  resultsLength = 0;
  itemsPerPage = 10;

  displayedColumns: string[] = ['type', 'createdAt', 'instanceId', 'name', 'message'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterForm: FormGroup;

  instances: string[] = [];
  filteredInstances!: Observable<string[]>;

  constructor(
    private logService: LogService,
    private instanceService: InstanceService,
    formBuilder: FormBuilder) {
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
        }),
      );

      this.instanceService.findAllInstances().subscribe(i => this.instances = i.map(i => i.instanceId));
    }

  ngAfterViewInit(): void {
    this.loadData();
  }

  submitFilter() {
    this.paginator.pageIndex = 0;
    this.loadData();
  }

  get logTypes() {
    return [undefined, LogType.Error, LogType.Trace, LogType.Warning];
  }

  loadData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.logService.filter(
          this.filterForm.get('searchText')?.value,
          this.filterForm.get('type')?.value,
          this.filterForm.get('from')?.value,
          this.filterForm.get('to')?.value,
          undefined,
          this.filterForm.get('instance')?.value,
          this.paginator.pageSize,
          this.paginator.pageIndex
        ))
      )
      .subscribe(data => {
        this.resultsLength = data.count;
        this.logs = data.items;
      });
  }

  getTypeCss(type: LogType) {

    switch (type) {
      case LogType.Error:
        return "log-type-error";
      case LogType.Trace:
        return "log-type-trace";
      case LogType.Warning:
        return "log-type-warning";
      default:
        return "";
    }
  }

  getErrorMessage(control?: AbstractControl | null) {
    return ValidationHelper.getErrorMessage(control);
  }
}
