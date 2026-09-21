import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'store', loadChildren: () => import('./pages/store/store.module').then(m => m.StorePageModule) },
  { path: 'history', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'repair-request', loadChildren: () => import('./pages/repair-request/repair-request.module').then(m => m.RepairRequestPageModule) },
  { path: 'job/:id', loadChildren: () => import('./pages/job/job.module').then(m => m.JobPageModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({ imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], exports: [RouterModule] })
export class AppRoutingModule {}
