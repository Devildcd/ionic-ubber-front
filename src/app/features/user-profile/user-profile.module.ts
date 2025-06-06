import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class UserProfileModule { }
