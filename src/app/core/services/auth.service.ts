import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Datos ficticios
  private users = [
    { email: 'admin@demo.com', password: '123456', token: 'fake-jwt-token-1' },
    { email: 'user@demo.com', password: 'abcdef', token: 'fake-jwt-token-2' }
  ];

  constructor() {}

  login(email: string, password: string): Observable<any> {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      // Retorna un observable con retraso para simular request HTTP
      return of({ token: user.token }).pipe(delay(500));
    } else {
      return throwError(() => new Error('Email o contraseña incorrectos')).pipe(delay(500));
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}