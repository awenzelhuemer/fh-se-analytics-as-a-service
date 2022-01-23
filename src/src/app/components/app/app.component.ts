import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('snav', { static: false }) sidenav!: MatSidenav;

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  @HostBinding('class') className = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    private overlay: OverlayContainer,
    storageService: StorageService,
    media: MediaMatcher) {

    this.authService.configure();

    const darkMode = storageService.get(StorageService.darkMode, media.matchMedia("(prefers-color-scheme: dark)").matches);
    this.onDarkModeChange(darkMode);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (this.mobileQuery.matches) {
          this.sidenav.close();
        }
      }
    });
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

  onDarkModeChange(darkMode: boolean) {
    const darkClassName = 'dark-theme';
    this.className = darkMode ? darkClassName : '';
    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }
}
