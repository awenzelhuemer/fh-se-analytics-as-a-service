import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Detector } from 'src/app/models/detector';
import { DetectorService } from 'src/app/services/detector.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Detector>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    "activated",
    "metricName",
    "interval",
    "lastExecuted"
  ];

  constructor(
    private detectorService: DetectorService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    this.loadDetectors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onActiveChange(detector: Detector) {
    detector.activated = !detector.activated;
    this.detectorService.update(detector).subscribe(() => this.loadDetectors());
  }

  loadDetectors() {
    this.detectorService.findAll().subscribe(d => {
      this.dataSource.data = d;
    });
  }

  addDetector() {
    this.dialogService.openAddDetectorDialog()
      .afterClosed()
      .subscribe(() => this.loadDetectors());
  }
}
