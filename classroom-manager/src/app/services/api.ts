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

  postStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.jsonServerurl}students`, student);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.jsonServerurl}students`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.jsonServerurl}students/${id}`);
  }

  putStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.jsonServerurl}students/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerurl}students/${id}`);
  }

  //CRUD Resources
}
