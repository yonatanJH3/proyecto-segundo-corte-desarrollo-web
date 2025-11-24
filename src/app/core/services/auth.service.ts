import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, TokenResponse } from './../models/auth.models';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../core/models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(req: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, req).pipe(
      tap(res => this.saveTokens(res.data.accessToken, res.data.refreshToken))
    );
  }

  refresh(refreshToken?: string): Observable<TokenResponse> {
    const token = refreshToken ?? this.getRefreshToken();
    return this.http.post<TokenResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken: token }).pipe(
      tap(res => this.saveTokens(res.accessToken, res.refreshToken))
    );
  }

  logout() {
    const token = this.getRefreshToken();
    console.log("tokentoken", token)
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, { refreshToken: token }).pipe(
            tap(res => console.log('✅ Respuesta del Login recibida (Service):', res)),
      tap(() => this.clearTokens())

    );
  }

  saveTokens(access: string, refresh: string) {
    if (!this.isBrowser()) return;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  getAccessToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    if (!this.isBrowser()) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  /////////////////////////////////

  getDecodedToken(): JwtPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  }

  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;
    return decoded.roles.includes(role);
  }

  
}