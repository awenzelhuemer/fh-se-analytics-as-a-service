import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Detector } from 'src/app/models/detector';
import { DetectorService } from 'src/app/services/detector.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-detector-detail',
  templateUrl: './detector-detail.component.html',
  styleUrls: ['./detector-detail.component.scss']
})
export class DetectorDetailComponent implements OnInit {

  id?: number;
  detector?: Detector;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detectorService: DetectorService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id !== null && !isNaN(+id)) {
        this.id = +id;
        this.loadDetector();
      }
    });
  }

  private loadDetector() {
    if (this.id) {
      this.detector = undefined;
      this.detectorService.findById(this.id).subscribe(d => this.detector = d);
    }
  }

  edit(): void {
    if (this.detector) {
      this.dialogService.openEditDetectorDialog(this.detector.id)
        .afterClosed()
        .subscribe(() => this.loadDetector());
    }
  }

  delete() {
    if (this.detector) {
      this.detectorService.delete(this.detector?.id).subscribe(d => this.router.navigate(["/detectors"]));
    }
  }
}
