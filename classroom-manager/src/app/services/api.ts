import { inject, Injectable } from '@angular/core';
import { Teacher } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  http = inject(HttpClient)
  jsonServerurl : String = "http://localhost:3000/"

  //CRUD classrooms

  //CRUD teachers
  postTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(`${this.jsonServerurl}teachers`, teacher);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.jsonServerurl}teachers`);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.jsonServerurl}teachers/${id}`);
  }

  putTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.jsonServerurl}teachers/${id}`, teacher);
  }

  //Borrar datos en clase!!!
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerurl}teachers/${id}`);
  }

  //CRUD students

  //CRUD Resources
}
