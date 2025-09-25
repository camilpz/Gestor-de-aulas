import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Api } from '../../../services/api';
import { Classroom, Resource, Teacher, Student } from '../../../models/models';
import { EditClassroomModal } from '../edit-classroom-modal/edit-classroom-modal';
import { DeleteClassroomModal } from '../delete-classroom-modal/delete-classroom-modal';
import { NewClassroomModal } from '../new-classroom-modal/new-classroom-modal';
import { AddResourceClassroomModal } from '../add-resource-classroom-modal';

@Component({
  selector: 'app-classroom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './classroom-table.html',
  styleUrl: './classroom-table.scss'
})
export class ClassroomTable implements OnInit {
  classrooms: Classroom[] = [];
  resources: Resource[] = [];
  teachers: Teacher[] = [];
  students: Student[] = [];

  private api = inject(Api);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadClassrooms();
    this.loadResources();
    this.loadTeachers();
    this.loadStudents();
  }

  loadTeachers() {
    this.api.getAllTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  loadStudents() {
    this.api.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  getTeachersForClassroom(classroom: Classroom): Teacher[] {
    if (!classroom.teachersId || !this.teachers.length) return [];
    return this.teachers.filter(t => classroom.teachersId.map(String).includes(String(t.id)));
  }

  getStudentsForClassroom(classroom: Classroom): Student[] {
    if (!classroom.studentsId || !this.students.length) return [];
    return this.students.filter(s => classroom.studentsId.map(String).includes(String(s.id)));
  }

  loadClassrooms() {
    this.api.getAllClassrooms().subscribe((data: Classroom[]) => {
      this.classrooms = data;
    });
  }

  loadResources() {
    this.api.getAllResources().subscribe((data: Resource[]) => {
      this.resources = data;
    });
  }

  getResourcesForClassroom(classroom: Classroom): any[] {
    if (classroom.resources && classroom.resources.length) {
      return classroom.resources;
    }
    if (classroom.resourcesIds && classroom.resourcesIds.length && this.resources.length) {
      return this.resources.filter(r => classroom.resourcesIds!.map(String).includes(String(r.id)));
    }
    return [];
  }

  editClassroom(classroom: Classroom) {
    const dialogRef = this.dialog.open(EditClassroomModal, {
      width: '400px',
      data: classroom
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadClassrooms();
    });
  }

  deleteClassroom(classroom: Classroom) {
    const dialogRef = this.dialog.open(DeleteClassroomModal, {
      width: '520px',
      panelClass: 'custom-dialog-panel',
      disableClose: true,
      data: classroom
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.loadClassrooms();
    });
  }

  newClassroom() {
    const dialogRef = this.dialog.open(NewClassroomModal, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.loadClassrooms();
    });
  }

  addResource(classroom: Classroom) {
    const dialogRef = this.dialog.open(AddResourceClassroomModal, {
      width: '400px',
      data: classroom,
      panelClass: 'custom-dialog-panel',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadClassrooms();
    });
  }
}