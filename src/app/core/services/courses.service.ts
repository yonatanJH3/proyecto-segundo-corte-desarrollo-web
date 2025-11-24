import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Course, CourseResponse } from '../models/courses.models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(user: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/save/courses`, user);
  }

  getListCourses(): Observable<Course[]> {
  return this.http.get<CourseResponse>(`${this.apiUrl}/get/courses`)
    .pipe(
      map(response => response.data)
    );
}
}