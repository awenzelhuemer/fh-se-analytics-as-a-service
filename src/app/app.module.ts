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
import { ApiInterceptor } from './interceptors/api-interceptor';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/de-at';
import { DetectorDetailComponent } from './components/detector-detail/detector-detail.component';
import { AggregateOperationPipe } from './pipes/aggregate-operation.pipe';
import { CompareTypePipe } from './pipes/compare-type.pipe';
import { EditDetectorDialogComponent } from './components/edit-detector-dialog/edit-detector-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogListComponent } from './components/log-list/log-list.component';
import { LogTypePipe } from './pipes/log-type.pipe';
import { LogFilterComponent } from './components/log-filter/log-filter.component';

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
    LoadingIndicatorComponent,
    DetectorDetailComponent,
    AggregateOperationPipe,
    CompareTypePipe,
    EditDetectorDialogComponent,
    LogListComponent,
    LogTypePipe,
    LogFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
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
