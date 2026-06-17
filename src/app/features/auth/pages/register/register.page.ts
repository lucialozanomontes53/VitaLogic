import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonNote, IonSpinner,
} from '@ionic/angular/standalone';
import { AuthStore } from '../../state/auth.store';

@Component({
  selector: 'app-register',
  host: { class: 'ion-page' },
  templateUrl: './register.page.html',
  imports: [
    ReactiveFormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonNote, IonSpinner,
  ],
})
export class RegisterPage {
  private readonly store  = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly loading = this.store.loading;
  protected readonly error   = this.store.error;

  protected readonly form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    const { fullName, email, password } = this.form.getRawValue();
    await this.store.register({ fullName: fullName!, email: email!, password: password! });
    if (!this.store.error()) {
      await this.router.navigate(['/home']);
    }
  }
}
