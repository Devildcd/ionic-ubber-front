import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  standalone: false
})
export class ProfileSettingsComponent  implements OnInit {
  profileForm!: FormGroup;
  user: any;
  isEditing = false;

   constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.profileForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
      email: ['', [Validators.email, Validators.maxLength(255)]],
    });
  }

  async ngOnInit() {
  this.loadingCtrl.create({ message: 'Cargando perfil...' }).then(loader => {
    loader.present();
    this.profileService.getProfile().subscribe({
      next: resp => {
        loader.dismiss();
        this.user = resp.data;
        this.profileForm.patchValue({
          name: this.user.name,
          email: this.user.email,
        });
        console.log(this.user)
      },
      error: () => {
        loader.dismiss();
        this.presentToast('Error cargando perfil', 'danger');
      }
    });
  });
   this.profileForm.markAsPristine();
}

async onSubmit() {
  if (!this.canSave) {
    return;
  }

  const { name, email } = this.profileForm.value;

  const loader = await this.loadingCtrl.create({ message: 'Guardando cambios...' });
  await loader.present();

  this.profileService.updateProfile({ name, email }).subscribe({
    next: resp => {
      loader.dismiss();

      this.user = resp.data;

      this.isEditing = false;

      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
      });
      this.profileForm.markAsPristine();

      this.presentToast('Perfil actualizado', 'danger');
    },
    error: () => {
      loader.dismiss();
      this.presentToast('Error actualizando perfil', 'danger');
    }
  });
}


get canSave(): boolean {
    return this.isEditing && this.profileForm.dirty && this.profileForm.valid;
  }


   toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // cancelar edición: restaurar valores y estado
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
      });
      this.profileForm.markAsPristine();
    }
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, color, duration: 2000 });
    toast.present();
  }
}
