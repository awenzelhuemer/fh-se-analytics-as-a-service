import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Detector } from 'src/app/models/detector';
import { DetectorService } from 'src/app/services/detector.service';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit {

  dataSource: Detector[] = [];

  displayedColumns = [
    "activated",
    "metricName",
    "interval",
    "lastExecuted"
  ];

  constructor(private detectorService: DetectorService) { }

  ngOnInit(): void {
    this.load();
  }

  onActiveChange(detector: Detector) {
    detector.activated = !detector.activated;
    this.detectorService.update(detector).subscribe(() => this.load());
  }

  load() {
    this.detectorService.findAll().subscribe(d => {
      this.dataSource = d;
    });
  }
}
