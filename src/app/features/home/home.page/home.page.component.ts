import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

interface Suggestion {
  icon: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss'],
  standalone: false
})
export class HomePageComponent  implements OnInit {
  searchText: string = '';
   suggestions: Suggestion[] = [];
   santiagoDeCubaCenter: google.maps.LatLngLiteral = {
    lat: 20.024,    // 20°01′26″N ≈ 20.024°
    lng: -75.821    // 75°49′16″W ≈ -75.821°
  };
   searchQuery = '';
   showActions = true;

   @ViewChild('searchWrapper', { static: true })
   searchWrapper!: ElementRef<HTMLElement>;
   showSearch = true;

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
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

   // Al hacer clic o tocar fuera, ocultar
   @HostListener('document:click', ['$event'])
   @HostListener('document:touchstart', ['$event'])
   onPointerDown(event: Event) {
     if (!this.searchWrapper.nativeElement.contains(event.target as Node)) {
       this.showSearch = false;
     }
   }

   ionViewWillEnter(): void {
    // Cada vez que la vista entra en escena,
    // re-inicializas la visibilidad
    this.showSearch = true;
  }

   // Al levantar el dedo, volver a mostrar
   @HostListener('document:touchend', ['$event'])
   onTouchEnd(event: TouchEvent) {
     this.showSearch = true;
   }
    constructor() {}

  ngOnInit() {
    // Carga inicial de sugerencias
    this.suggestions = [
      { icon: 'fast-food', title: 'Restaurantes', subtitle: 'Los más cercanos' },
      { icon: 'film', title: 'Películas', subtitle: 'Hoy en cines' },
      { icon: 'music', title: 'Conciertos', subtitle: 'Cerca de ti' },
      { icon: 'paw', title: 'Mascotas', subtitle: 'Para adoptar' }
    ];
  }

 hideSearch() {
    this.showSearch = false;
  }

  openSearch() {
    this.showSearch = true;
  }

  // Si necesitas volver a mostrarla:
  showSearchCard() {
    this.showSearch = true;
  }

  onSearchChange() {
    // Lógica de geocoding al escribir...
    console.log('Buscando:', this.searchQuery);
  }

  clearInput() {
    this.searchQuery = '';
    // Opcional: volver a centrar mapa, ocultar sugerencias, etc.
  }

  locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.santiagoDeCubaCenter = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      });
    }
  }

}
