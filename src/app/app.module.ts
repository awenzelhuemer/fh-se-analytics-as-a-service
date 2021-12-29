import { forwardRef, LOCALE_ID, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { ActionTypePipe } from './pipes/action-type.pipe';
import { TimespanPipe } from './pipes/timespan.pipe';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/de-at';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

registerLocaleData(localeDeAt);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DetectorListComponent,
    ActionTypePipe,
    TimespanPipe,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot()
  ],
  providers: 
  [
    { provide: LOCALE_ID, useValue: 'de-AT' },
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
