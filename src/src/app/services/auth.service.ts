import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  signIn(): boolean {
    this.oauthService.initImplicitFlow();
    return true;
  }

  signOut(): boolean {
    this.oauthService.logOut(true);
    return true;
  }

  isSignedIn() {
    return this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken();
  }
}
