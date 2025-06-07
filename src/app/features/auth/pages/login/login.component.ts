import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent  implements OnInit {

   public loginForm!: FormGroup;
  public isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(255),
          this.noWhitespaceValidator
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  // Evita solo espacios en blanco
  private noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    const payload: any = {
      email: this.email?.value.trim().toLowerCase(),
      password: this.password?.value
    };

    this.authService.login(payload).subscribe({
      next: async (resp: any) => {
        await loading.dismiss();

        // Guardar los tokens en localStorage o en Ionic Storage 
        // localStorage.setItem('accessToken', resp.accessToken);
        // localStorage.setItem('refreshToken', resp.refreshToken);
        localStorage.setItem('user', JSON.stringify(resp.user));

        const toast = await this.toastCtrl.create({
          message: `Bienvenido`,
          duration: 2000,
          color: 'danger',
        });
        await toast.present();

        // Redirigir a la ruta protegida (home/dashboard, etc.)
        this.navCtrl.navigateRoot('/tabs/home');
      },
      error: async (err: Error) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: err.message,
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
        this.isSubmitting = false;
      }
    });
  }

}
