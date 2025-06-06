import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss'],
  standalone: false
})
export class MiniMapComponent  implements OnInit {
  @Input() center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  @Input() zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    draggable: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    gestureHandling: 'greedy'
  }

  constructor() { }

  ngOnInit() {}

}
