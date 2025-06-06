import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPageComponent } from './tabs.page/tabs.page.component';



@NgModule({
  declarations: [
    TabsPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
