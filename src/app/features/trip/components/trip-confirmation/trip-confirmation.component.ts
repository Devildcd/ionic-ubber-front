import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trip-confirmation',
  templateUrl: './trip-confirmation.component.html',
  styleUrls: ['./trip-confirmation.component.scss'],
  standalone: false
})
export class TripConfirmationComponent  implements OnInit {
   driver = {
    photo: 'assets/images/user.png',
    name: 'Juan Torres',
    vehicle: 'Toyota Prius',
    rating: 4.5,
    eta: '3 min',
    plate: 'asdasdsad',
    phone: '55555555',
    color: 'rojo'
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

   getStars(rating: number): any[] {
    return Array(Math.floor(rating));
  }

    close() {
    this.modalCtrl.dismiss();
  }

  share() {
    // tu lógica de compartir
  }

  follow() {
    // tu lógica de seguir en mapa
  }


}
