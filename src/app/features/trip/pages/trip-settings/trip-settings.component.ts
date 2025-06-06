import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-trip-settings',
  templateUrl: './trip-settings.component.html',
  styleUrls: ['./trip-settings.component.scss'],
  standalone: false
})
export class TripSettingsComponent  implements OnInit {
  tripForm!: FormGroup;

  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  constructor(private fb: FormBuilder) {}

 ngOnInit(): void {
    this.tripForm = this.fb.group({
      mode: ['single', Validators.required],
      origin: ['', Validators.required],
      destinations: this.fb.array([this.createDestination()])
    });
  }

   get destinations(): FormArray {
    return this.tripForm.get('destinations') as FormArray;
  }

  createDestination(): FormGroup {
    return this.fb.group( {
      address: ['', Validators.required]
    } );
  }

   onModeChange(event: CustomEvent) {
    const mode = event.detail.value;
    this.tripForm.patchValue({ mode });
    if (mode === 'single') {
      while (this.destinations.length > 1) {
        this.destinations.removeAt(1);
      }
    }
  }

    addDestination() {
    if (this.destinations.length < 5 && this.tripForm.value.mode === 'multiple') {
      this.destinations.push(this.createDestination());
    }
  }

  removeDestination(index: number) {
    if (this.destinations.length > 1) {
      this.destinations.removeAt(index);
    }
  }

  submit() {
    if (this.tripForm.valid) {
      console.log(this.tripForm.value);
      // Navegar a la siguiente vista o despachar acción
    }
  }


  // Modal Options
   cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

}
