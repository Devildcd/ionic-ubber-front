import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { passwordMatchValidator } from '../../utils/password-match.validator';
import { RegisterPayload } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent  implements OnInit {
  public registerForm!: FormGroup;
  public isSubmitting = false;
  public roles = ['USER', 'ADMIN', 'DEVELOPER'];

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
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            this.noWhitespaceValidator
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.maxLength(255),
            this.noWhitespaceValidator
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{8}$/)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // Custom: al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
          ]
        ],
        passwordConfirmed: ['', Validators.required],
        role: ['USER', [Validators.required]]
      },
      {
        validators: [passwordMatchValidator]
      }
    );
  }

  // Evita que el campo solo contenga espacios en blanco
  private noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  // Accesores para simplificar el acceso desde el template
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get passwordConfirmed() {
    return this.registerForm.get('passwordConfirmed');
  }
  get role() {
    return this.registerForm.get('role');
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      // Marcar todos los campos como “tocados” para que se muestren errores
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingCtrl.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    const payload: RegisterPayload = {
      name: this.name?.value.trim(),
      email: this.email?.value.trim().toLowerCase(),
      phone: this.phone?.value.trim(),
      password: this.password?.value,
      passwordConfirmed: this.passwordConfirmed?.value,
      role: this.role?.value
    };

    this.authService.register(payload).subscribe({
      next: async (user) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Usuario registrado con éxito',
          duration: 2000,
          color: 'success',
        });
        await toast.present();

        // Puedes navegar a la pantalla de login o a home
        this.navCtrl.navigateRoot('/auth/login');
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
