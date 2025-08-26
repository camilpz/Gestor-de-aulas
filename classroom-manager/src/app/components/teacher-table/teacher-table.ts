import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Teacher } from '../../models/models';
import { Api } from '../../services/api';
import { MatDialog } from '@angular/material/dialog';
import { NewTeacherModal } from '../new-teacher-modal/new-teacher-modal';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-teacher-table',
  imports: [MatTableModule, MatButton],
  templateUrl: './teacher-table.html',
  styleUrl: './teacher-table.scss'
})
export class TeacherTable implements OnInit {
  teachersData: Teacher[] = [];

  apiService = inject(Api);
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'subject', 'name'];

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
}
