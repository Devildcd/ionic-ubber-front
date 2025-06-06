import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TravelMapComponent } from './pages/travel-map/travel-map.component';
import { TripSettingsComponent } from './pages/trip-settings/trip-settings.component';
import { TripHistoryComponent } from './pages/trip-history/trip-history.component';

const routes: Routes = [
  {
    path: 'settings',
    component: TripSettingsComponent
  },
  {
    path: 'history',
    component: TripHistoryComponent
  },
  {
    path: 'map',
    component: TravelMapComponent
  },
  {
    path: '**',
    redirectTo: 'settings',
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
export class TripRoutingModule { }
