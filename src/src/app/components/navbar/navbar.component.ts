import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleClick = new EventEmitter<any>();
  @Output() darkModeChange = new EventEmitter<boolean>();

  darkMode: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private mediaMatcher: MediaMatcher,
    private storageService: StorageService
  ) {
    this.darkMode = this.storageService.get(StorageService.darkMode, this.mediaMatcher.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.storageService.set(StorageService.darkMode, this.darkMode);
    this.darkModeChange.emit(this.darkMode);
  }

  signIn() {
    this.authService.signIn();
  }

  get isSignedIn() {
    return this.authService.isSignedIn();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/home");
  }

  toggle() {
    this.toggleClick.emit();
  }

  get userinfo() {
    const claims = this.authService.getClaims() as { family_name: string, email: string, given_name: string };
    return claims ? `${claims.given_name} ${claims.family_name} (${claims.email})` : null;
  }
}
