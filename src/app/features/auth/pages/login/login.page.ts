import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { AuthStore } from '../../state/auth.store';

@Component({
  selector: 'app-login',
  host: { class: 'ion-page' },
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, IonContent, IonInput, IonButton, IonSpinner],
})
export class LoginPage {
  private readonly store  = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly loading = this.store.loading;
  protected readonly error   = this.store.error;

  protected readonly form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    await this.store.login({ email: email!, password: password! });
    if (!this.store.error()) {
      await this.router.navigate(['/home']);
    }
  }
}
