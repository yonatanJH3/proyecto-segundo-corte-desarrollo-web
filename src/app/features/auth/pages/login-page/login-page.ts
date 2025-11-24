import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPageComponent {
  username = '';
  password = '';
  keepLoggedIn = false;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
  }

  async onSubmit() {
   if (!this.username || !this.password) {
      this.errorMessage = 'Complete los campos correctamente';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const req = {
      username: this.username,       // Tu backend espera `username`
      password: this.password,
      deviceId: 'web-client',
      ipAddress: ''               // lo puedes llenar luego si usas IP real
    };

    this.authService.login(req).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.message || 'Credenciales inválidas';
      }
    });
  }

  async onResetPassword(){
    this.router.navigate(['/auth/register']);
  }
}