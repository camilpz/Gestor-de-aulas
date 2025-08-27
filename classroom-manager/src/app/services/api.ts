import { inject, Injectable } from '@angular/core';
import { Student, Teacher } from '../models/models';
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

  getTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.jsonServerurl}teachers/${id}`);
  }

  putTeacher(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.jsonServerurl}teachers/${id}`, teacher);
  }

  //Borrar datos en clase!!!
  deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerurl}teachers/${id}`);
  }

  //CRUD students

  postStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.jsonServerurl}students`, student);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.jsonServerurl}students`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.jsonServerurl}students/${id}`);
  }

  putStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.jsonServerurl}students/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerurl}students/${id}`);
  }

  //CRUD Resources
}
