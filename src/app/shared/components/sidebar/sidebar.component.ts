import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface MenuOption {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent  implements OnInit {
 options: MenuOption[] = [
    { label: 'Inicio',       icon: 'home-outline',    url: '/home' },
    { label: 'Perfil',       icon: 'person-circle-outline', url: '/profile' },
    { label: 'Notificaciones', icon: 'notifications-outline', url: '/notifications' },
    { label: 'Ajustes',      icon: 'settings-outline', url: '/settings' },
    { label: 'Cerrar sesión', icon: 'log-out-outline', url: '/logout' },
  ];

  constructor(private nav: NavController) {}

  ngOnInit() {}

  navigate(url: string) {
    this.nav.navigateRoot(url);
  }

}
