import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detector } from 'src/app/models/detector';
import { DetectorService } from 'src/app/services/detector.service';

@Component({
  selector: 'app-detector-detail',
  templateUrl: './detector-detail.component.html',
  styleUrls: ['./detector-detail.component.scss']
})
export class DetectorDetailComponent implements OnInit {

  detector?: Detector;

  constructor(
    private route: ActivatedRoute,
    private detectorService: DetectorService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if(id !== null && !isNaN(+id)) {
        this.detectorService.findById(+id).subscribe(d => this.detector = d);
      }
    });
  }
}
