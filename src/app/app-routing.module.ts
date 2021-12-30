import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectorDetailComponent } from './components/detector-detail/detector-detail.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { HomeComponent } from './components/home/home.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
