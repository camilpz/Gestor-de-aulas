import { inject, Injectable } from '@angular/core';
import { Student, Teacher, Classroom, Resource } from '../models/models';
import { Observable, switchMap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  /**
   * Devuelve todos los profesores que NO están asociados a ningún aula.
   */
  getUnassignedTeachers(): Observable<Teacher[]> {
    return this.getAllTeachers().pipe(
      switchMap((teachers: Teacher[]) =>
        this.getAllClassrooms().pipe(
          map((classrooms: Classroom[]) => {
            const assignedIds = new Set<string>();
            classrooms.forEach((c: Classroom) => {
              const ids = (c.teachersId || (c as any).teachersIds || []);
              ids.forEach((id: any) => assignedIds.add(id.toString()));
            });
            return teachers.filter((t: Teacher) => !assignedIds.has(t.id.toString()));
          })
        )
      )
    );
  }
  http = inject(HttpClient)
  jsonServerurl : String = "http://localhost:3000/"


  //CRUD classrooms
  getAllClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.jsonServerurl}classrooms`);
  }

  getClassroomById(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.jsonServerurl}classrooms/${id}`);
  }

  postClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.jsonServerurl}classrooms`, classroom);
  }

  putClassroom(id: string, classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.jsonServerurl}classrooms/${id}`, classroom);
  }

  deleteClassroom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerurl}classrooms/${id}`);
  }

  // Recursos
  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.jsonServerurl}resources`);
  }

  getResourceById(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.jsonServerurl}resources/${id}`);
  }

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
