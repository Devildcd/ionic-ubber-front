import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageComponent } from './tabs.page/tabs.page.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'trip',
        loadChildren: () =>
          import('../trip/trip.module').then(m => m.TripModule)
      },
      {
        path: 'services',
        loadChildren: () =>
          import('../customer-services/customer-services.module').then(m => m.CustomerServicesModule)
      },
       {
        path: 'profile',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TabsRoutingModule { }
