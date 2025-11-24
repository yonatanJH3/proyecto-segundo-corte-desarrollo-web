import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Crear usuario (registro)
  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/register`, user);
  }

  getListUserForRoles(role: string): Observable<User[]> {
  return this.http.get<UserResponse>(`${this.apiUrl}/usecase/user?role=${role}`)
    .pipe(
      map(response => response.data) // extrae solo el array de usuarios
    );
}
}
