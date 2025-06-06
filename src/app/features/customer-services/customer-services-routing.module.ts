import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerServicesPageComponent } from './customer-services.page/customer-services.page.component';

const routes: Routes = [
  {
      path: '',
      component: CustomerServicesPageComponent
    },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerServicesRoutingModule { }
