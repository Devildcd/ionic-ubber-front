import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { BottomMenuTabComponent } from './components/bottom-menu-tab/bottom-menu-tab.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarFabComponent } from './components/sidebar-fab/sidebar-fab.component';
import { NotificationsFabComponent } from './components/notifications-fab/notifications-fab.component';



@NgModule({
  declarations: [
    BottomMenuTabComponent,
    HeaderMenuComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    PageLayoutComponent,
    SidebarComponent,
    SidebarFabComponent,
    NotificationsFabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BottomMenuTabComponent,
    HeaderMenuComponent,
    PageLayoutComponent,
    SidebarComponent,
    SidebarFabComponent,
    NotificationsFabComponent
  ]
})
export class SharedModule { }
