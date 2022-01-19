import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from '../auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  signIn(): boolean {
    this.oauthService.initImplicitFlow();
    return true;
  }

  configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  getClaims() {
    return this.oauthService.getIdentityClaims();
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
