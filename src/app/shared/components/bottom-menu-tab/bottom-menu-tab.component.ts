import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-menu-tab',
  templateUrl: './bottom-menu-tab.component.html',
  styleUrls: ['./bottom-menu-tab.component.scss'],
  standalone: false
})
export class BottomMenuTabComponent  implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

   openMenu() {
    // “main-menu” debe coincidir con menuId del ion-menu
    this.menuCtrl.open('main-menu');
  }

}
