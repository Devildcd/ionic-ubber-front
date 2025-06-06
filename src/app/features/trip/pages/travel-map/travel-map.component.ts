import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripDetailComponent } from '../../components/trip-detail/trip-detail.component';

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.scss'],
  standalone: false
})
export class TravelMapComponent  implements OnInit {
  santiagoDeCubaCenter: google.maps.LatLngLiteral = {
    lat: 20.024,    // 20°01′26″N ≈ 20.024°
    lng: -75.821    // 75°49′16″W ≈ -75.821°
  };

 constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log("Hola");
    this.openTripDetails();
  }

   async openTripDetails() {
    const modal = await this.modalCtrl.create({
      component: TripDetailComponent,
      cssClass: 'trip-details-modal',
    breakpoints: [0, 0.4, 1.0],      // 0 = cerrado, 0.4 = 40% altura, 0.8 = 80%
    initialBreakpoint: 0.6,  
    });
    await modal.present();
  }

}
