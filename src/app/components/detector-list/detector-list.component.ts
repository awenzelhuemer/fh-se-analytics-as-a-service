import { Component, OnInit } from '@angular/core';
import { Detector } from 'src/app/models/detector';
import { DetectorService } from 'src/app/services/detector.service';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit {

  detectors?: Detector[];

  displayedColumns = [
    "activated",
    "metricName",
    "interval",
    "offset",
    "action",
    "lastExecuted"
  ];

  constructor(private detectorService: DetectorService) { }

  ngOnInit(): void {
    this.detectorService.getDetectors().subscribe(d => this.detectors = d);
  }

}
