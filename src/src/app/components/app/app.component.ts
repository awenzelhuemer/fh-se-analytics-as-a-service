import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('snav', { static: false }) sidenav!: MatSidenav;

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    private authService: AuthService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.authService.configure();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  get isSignedIn() {
    return this.authService.isSignedIn();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/home");
  }

  signIn() {
    this.authService.signIn();
    this.sidenav.open();
  }
}
