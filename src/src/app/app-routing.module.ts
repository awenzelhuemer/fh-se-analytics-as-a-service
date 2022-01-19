import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { DetectorDetailComponent } from './components/detector-detail/detector-detail.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { HomeComponent } from './components/home/home.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { MetricDashboardComponent } from './components/metric-dashboard/metric-dashboard.component';
import { MetricListComponent } from './components/metric-list/metric-list.component';
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
    component: HomeComponent,
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'clients',
        component: ClientListComponent
      },
      {
        path: 'detectors',
        component: DetectorListComponent
      },
      {
        path: 'detectors/:id',
        component: DetectorDetailComponent
      },
      {
        path: 'logs',
        component: LogListComponent
      },
      {
        path: 'metrics',
        component: MetricDashboardComponent
      },
      {
        path: 'metrics/:configId',
        component: MetricListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
