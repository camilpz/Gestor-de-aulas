import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Teacher } from '../../../models/models';
import { Api } from '../../../services/api';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NewTeacherModal } from '../new-teacher-modal/new-teacher-modal';
import { DeleteTeacherModal } from '../delete-teacher-modal/delete-teacher-modal';

@Component({
  selector: 'app-teacher-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './teacher-table.html',
  styleUrl: './teacher-table.scss'
})
export class TeacherTable implements OnInit {
  teachersData: Teacher[] = [];

  apiService = inject(Api);
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'subject', 'name', 'actions'];

  ngOnInit(): void {
    this.fetchTeachers();
  }


  //---------------------Fetch Data---------------
  fetchTeachers() {
    this.apiService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachersData = data;
      },
      error: (error) => {
        console.error('Error al cargar los profesores', error);
        this.teachersData = [];
      }
    })
  }

  //-------------------Modals---------------
  openNewTeacherModal() {
    const dialogRef = this.dialog.open(NewTeacherModal,
      {
        width: '400px',
        panelClass: 'custom-dialog-panel',
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTeachers();
      }
    });
  }

  editTeacher(teacher : Teacher){

  }

  deleteTeacher(teacherId : string){
    const dialogRef = this.dialog.open(DeleteTeacherModal, {
      width: '400px',
      data: teacherId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTeachers();
      }
    });
  }
}
