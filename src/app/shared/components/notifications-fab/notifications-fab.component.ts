import { Component, OnInit } from '@angular/core';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-notifications-fab',
  templateUrl: './notifications-fab.component.html',
  styleUrls: ['./notifications-fab.component.scss'],
  standalone: false
})
export class NotificationsFabComponent  implements OnInit {
   notifications: Notification[] = [
    { id: 1, title: 'Viaje confirmado', message: 'Tu viaje a La Habana está listo.', date: new Date('2025-05-26T10:15'), read: false },
    { id: 2, title: 'Nueva promoción', message: '20% de descuento en rutas cortas.', date: new Date('2025-05-25T09:30'), read: true },
    { id: 3, title: 'Recordatorio', message: 'No olvides tu equipaje ligero.', date: new Date('2025-05-24T14:45'), read: false },
    // …más notificaciones si quieres …
  ];

  constructor() { }

  ngOnInit() {}

  markRead(n: Notification) {
    n.read = true;
  }

   markAllRead() {
    this.notifications.forEach(n => n.read = true);
  }

}
