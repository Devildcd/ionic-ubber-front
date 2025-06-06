import { Component, OnInit } from '@angular/core';

interface Trip {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;       // en km
  price: number;          // en moneda local
  rating: number | null;  // 1.0–5.0 o null
  timeAccepted: Date;     // hora exacta en que se aceptó
  timeArrived: Date;      // hora exacta en que llegó
}

interface Rating {
  id: number;
  date: Date;
  rating: number;    // 1.0–5.0
  comment: string;
}

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.scss'],
  standalone: false
})
export class TripHistoryComponent  implements OnInit {

   public selectedSegment: 'viajes' | 'calificaciones' = 'viajes';
   public trips: Trip[] = [];
   public ratings: Rating[] = [];
   public selectedFilter: 'recent' | 'week' | 'month' | 'all' = 'recent';
   public Math = Math;

  constructor() { }

 ngOnInit() {
    // **Ejemplo de datos**; en producción, reemplazar por llamada a API/servicio
    this.trips = [
      {
        id: 1,
        date: new Date(2025, 4, 12),
        origin: 'Calle A, 123, Edificio Central, Ciudad Muy Larga',
        destination: 'Avenida B, 456, Zona Costera',
        distance: 5.4,
        price: 12.50,
        rating: 3.0,
        timeAccepted: new Date(2025, 4, 12, 8, 30),
        timeArrived: new Date(2025, 4, 12, 8, 45)
      },
      {
        id: 2,
        date: new Date(2025, 4, 5),
        origin: 'Calle X, 789',
        destination: 'Plaza Y',
        distance: 3.2,
        price: 8.75,
        rating: 4.0,
        timeAccepted: new Date(2025, 4, 5, 14, 0),
        timeArrived: new Date(2025, 4, 5, 14, 20)
      }
      // … Más viajes si los hubiera
    ];

    this.ratings = [
      {
        id: 1,
        date: new Date(2025, 4, 12),
        rating: 3.0,
        comment: 'Llegó a tiempo, pero el conductor hablaba mucho.'
      },
      {
        id: 2,
        date: new Date(2025, 4, 5),
        rating: 4.0,
        comment: 'El viaje fue muy cómodo y amable.'
      }
      // … Más calificaciones
    ];
  }

  // --------------------------------
  // 4) Cuando cambie el segmento (viajes / calificaciones)
  // --------------------------------
  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    // Reiniciar filtro a “Más recientes” cuando se cambie de sección
    this.selectedFilter = 'recent';
  }

  // --------------------------------
  // 5) Cuando cambie el filtro de tiempo
  // --------------------------------
  onFilterChanged(event: any) {
    this.selectedFilter = event.detail.value;
  }

  // --------------------------------
  // 6) Getter para viajes filtrados
  // --------------------------------
  get filteredTrips(): Trip[] {
    // Primero, clonar y ordenar por fecha descendente
    const sorted = [...this.trips].sort((a, b) => b.date.getTime() - a.date.getTime());
    const now = new Date().getTime();

    switch (this.selectedFilter) {
      case 'recent':
        // “Más recientes” = todos pero ya ordenados (sin recorte)
        return sorted;

      case 'week':
        // Últimos 7 días
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        return sorted.filter(trip => trip.date.getTime() >= oneWeekAgo);

      case 'month':
        // Últimos 30 días
        const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
        return sorted.filter(trip => trip.date.getTime() >= oneMonthAgo);

      case 'all':
        // “Todo” = todos, sin importar fecha (pero ordenados-desc)
        return sorted;

      default:
        return sorted;
    }
  }

  // --------------------------------
  // 7) Getter para calificaciones filtradas
  // --------------------------------
  get filteredRatings(): Rating[] {
    // Ordenar calificaciones por fecha descendente
    const sorted = [...this.ratings].sort((a, b) => b.date.getTime() - a.date.getTime());
    const now = new Date().getTime();

    switch (this.selectedFilter) {
      case 'recent':
        return sorted;

      case 'week':
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        return sorted.filter(r => r.date.getTime() >= oneWeekAgo);

      case 'month':
        const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
        return sorted.filter(r => r.date.getTime() >= oneMonthAgo);

      case 'all':
        return sorted;

      default:
        return sorted;
    }
  }

  // --------------------------------
  // 8) Eliminar un viaje individual
  // --------------------------------
  deleteTrip(id: number) {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }

  // --------------------------------
  // 9) Eliminar una calificación individual
  // --------------------------------
  deleteRating(id: number) {
    this.ratings = this.ratings.filter(r => r.id !== id);
  }

  // --------------------------------
  // 10) Eliminar TODO el historial de la sección actual
  // --------------------------------
  clearAll() {
    if (this.selectedSegment === 'viajes') {
      this.trips = [];
    } else {
      this.ratings = [];
    }
  }

}
