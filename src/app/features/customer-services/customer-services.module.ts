import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServicesRoutingModule } from './customer-services-routing.module';
import { CustomerServicesPageComponent } from './customer-services.page/customer-services.page.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CustomerServicesPageComponent
  ],
  imports: [
    CommonModule,
    CustomerServicesRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class CustomerServicesModule { }
