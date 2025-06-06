import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  standalone: false
})
export class ProfileSettingsComponent  implements OnInit {
 profileForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        photo: [null],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.profileForm.patchValue({ photo: file });
    this.profileForm.get('photo')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    if (file) reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Aquí enviarías los datos al backend
      console.log('Datos de perfil:', this.profileForm.value);
    }
  }
}
