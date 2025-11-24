import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
type ViewState = 'form' | 'sending' | 'sent';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
})
export class RegisterPageComponent {
  form: FormGroup;
  viewState: ViewState = 'form';
  emailSent = '';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.form.invalid || this.viewState === 'sending') return;

    this.viewState = 'sending';
    this.cdr.detectChanges();

    const email = this.form.value.email;

    // Simulación (reemplazable por Firebase)
    setTimeout(() => {
      this.emailSent = email;
      this.viewState = 'sent';
      this.cdr.detectChanges();
    }, 1500);
  }

  onBackToLogin() {
    if (this.viewState === 'sending') return; // ❌ no permitir clic durante carga
    this.viewState = 'form';
    this.form.reset();
    this.cdr.detectChanges();
    this.router.navigate(['/auth/login']);
  }
}