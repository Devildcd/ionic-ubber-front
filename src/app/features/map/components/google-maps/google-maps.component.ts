import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  standalone: false
})
export class GoogleMapsComponent  implements OnInit {
  @Input() center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  @Input() zoom = 12;
   fabOpen = false;
    darkStyle: google.maps.MapTypeStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    // … más reglas …
  ];

  options: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: false,
  draggable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  gestureHandling: 'greedy',    // <-- IMPORTANTE para que capture scroll/drag
  disableDefaultUI: true,
  styles: [
  // 1. Fondo y relieve muy oscuro
  { elementType: 'geometry', stylers: [{ color: '#1d1d1d' }] },
  { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#2a2a2a' }] },

  // 2. Agua
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#162f4a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a6f8f' }] },

  // 3. Carreteras principales (más oscuras)
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#888888' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d1d' }, { weight: 1 }] },

  // 4. Calles locales (también más oscuras)
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#666666' }] },
  { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#dddddd' }] },
  { featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d1d' }, { weight: 0.8 }] },

  // 5. Parques (POI Park)
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#273127' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#AED581' }] },  // verde suave

  // 6. Restaurantes
  { featureType: 'poi.business', elementType: 'labels.text.fill', stylers: [{ color: '#FFA726' }] },

  // 7. Compras y retail
  { featureType: 'poi.attraction', elementType: 'labels.text.fill', stylers: [{ color: '#FFD54F' }] },

  // 8. Educación (escuelas, universidades)
  { featureType: 'poi.school', elementType: 'labels.text.fill', stylers: [{ color: '#90CAF9' }] },

  // 9. Salud (hospitales, clínicas)
  { featureType: 'poi.medical', elementType: 'labels.text.fill', stylers: [{ color: '#E57373' }] },

  // 10. Transporte (metro, tren)
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#BA68C8' }] },

  // 11. Otros POI genéricos
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#B0BEC5' }] },

  // 12. Etiquetas generales (ciudades, barrios, calles sin categoría)
  { elementType: 'labels.text.fill', stylers: [{ color: '#E0E0E0' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d1d' }, { weight: 1 }] },

  // 13. Íconos y marcadores nativos
  { elementType: 'icon', stylers: [] }
]
};

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

   toggleFab() {
    this.fabOpen = !this.fabOpen;
  }

  go(network: string) {
    console.log('Compartir en', network);
  }

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },

  ];

  async openActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode: 'md',            // ← fuerza el estilo iOS
      buttons: this.actionSheetButtons
    });
    await sheet.present();
  }
}
