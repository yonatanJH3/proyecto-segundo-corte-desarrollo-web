import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Classrooms, ClassroomsResponse } from '../models/classrooms.models';

@Injectable({ providedIn: 'root' })
export class ClassroomsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(user: Classrooms): Observable<Classrooms> {
    return this.http.post<Classrooms>(`${this.apiUrl}/save/classroom`, user);
  }

  getListCourses(): Observable<Classrooms[]> {
  return this.http.get<ClassroomsResponse>(`${this.apiUrl}/get/classrooms`)
    .pipe(
      map(response => response.data)
    );
}
}