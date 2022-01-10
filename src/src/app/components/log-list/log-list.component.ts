import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs/operators';
import { Log } from 'src/app/models/log';
import { LogType } from 'src/app/models/log-type';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements AfterViewInit {

  logs: Log[] = [];
  resultsLength = 0;
  itemsPerPage = 10;

  displayedColumns: string[] = ['type', 'createdAt', 'instanceId', 'name', 'message'];

  filterValues: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private logService: LogService) {
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.logService.filter(
          this.filterValues?.searchText,
          this.filterValues?.type,
          this.filterValues?.from,
          this.filterValues?.to,
          undefined,
          this.filterValues?.instanceId,
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

  filterChange(values: any) {
    this.paginator.pageIndex = 0;
    this.filterValues = values;
    this.loadData();
  }
}
