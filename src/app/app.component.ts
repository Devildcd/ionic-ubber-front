import { Component } from '@angular/core';

interface MenuOption {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  options: MenuOption[] = [
    { label: 'Ajustes',      icon: 'settings', url: '/settings' },
    { label: 'Pagos', icon: 'card', url: '/notifications' },
    { label: 'Referidos',       icon: 'share-social', url: '/profile' },
    { label: 'Centro de Ayuda',       icon: 'help-circle',    url: '/home' },
    { label: 'Cerrar sesión', icon: 'log-out', url: '/logout' },
  ];
}
