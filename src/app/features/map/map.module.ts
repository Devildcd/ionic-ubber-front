import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { IonicModule } from '@ionic/angular';
import { MiniMapComponent } from './components/mini-map/mini-map.component';



@NgModule({
  declarations: [
    GoogleMapsComponent,
    MiniMapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    IonicModule
  ],
  exports: [GoogleMapsComponent, MiniMapComponent]
})
export class MapModule { }
