import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripConfirmationComponent } from '../trip-confirmation/trip-confirmation.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  standalone: false
})
export class TripDetailComponent  implements OnInit {
  tripType = 'normal';
  drivers = [
    { photo: 'assets/drivers/ana.jpg', name: 'Ana Pérez', vehicle: 'Toyota Yaris', rating: 5 },
    { photo: 'assets/drivers/josé.jpg', name: 'José Gómez', vehicle: 'Honda Civic', rating: 4 },
    // …más conductores
  ];

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openDriverModal() {
  setTimeout(async () => {
    const modal = await this.modalCtrl.create({
      component: TripConfirmationComponent,
      cssClass: 'custom-modal',
      backdropDismiss: true,
      initialBreakpoint: 0.8,
    });
    this.modalCtrl.dismiss({ confirmed: true });
    await modal.present();
  }, 3000); // 3000ms = 3 segundos
}


  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}




