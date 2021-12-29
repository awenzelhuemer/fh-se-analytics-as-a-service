import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.loadingSub
    .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
    .subscribe((loading) => {
      this.loading = loading;
    });
  }

}
