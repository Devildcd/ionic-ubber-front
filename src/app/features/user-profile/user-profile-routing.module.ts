import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileSettingsComponent
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
