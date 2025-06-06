import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidebar-fab',
  templateUrl: './sidebar-fab.component.html',
  styleUrls: ['./sidebar-fab.component.scss'],
  standalone: false
})
export class SidebarFabComponent  implements OnInit {

   constructor(private menuCtrl: MenuController) { }

    ngOnInit() {}

     openMenu() {
      // “main-menu” debe coincidir con menuId del ion-menu
      this.menuCtrl.open('main-menu');
    }

}
