import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
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
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (this.mobileQuery.matches) {
          this.sidenav.close();
        }
      }
    })
  }

  get isSignedIn() {
    return this.authService.isSignedIn();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/home");
  }

  get opened() {
    return !this.mobileQuery.matches && this.authService.isSignedIn();
  }

  signIn() {
    this.authService.signIn();
    this.sidenav.open();
  }
}
