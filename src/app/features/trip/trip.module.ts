import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelMapComponent } from './pages/travel-map/travel-map.component';
import { IonicModule } from '@ionic/angular';
import { TripRoutingModule } from './trip-routing.module';
import { MapModule } from '../map/map.module';
import { TripSettingsComponent } from './pages/trip-settings/trip-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripConfirmationComponent } from './components/trip-confirmation/trip-confirmation.component';
import { TripHistoryComponent } from './pages/trip-history/trip-history.component';

@NgModule({
  declarations: [
    TravelMapComponent,
    TripSettingsComponent,
    TripDetailComponent,
    TripConfirmationComponent,
    TripHistoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TripRoutingModule,
    MapModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TripModule { }
