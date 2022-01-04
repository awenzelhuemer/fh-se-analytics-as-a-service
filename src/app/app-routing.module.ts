import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectorDetailComponent } from './components/detector-detail/detector-detail.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { HomeComponent } from './components/home/home.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { MetricDashboardComponent } from './components/metric-dashboard/metric-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'detectors',
    component: DetectorListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detectors/:id',
    component: DetectorDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    component: LogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'metrics',
    component: MetricDashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
