import { Component, inject, OnInit } from '@angular/core';
import { Student } from '../../models/models';
import { Api } from '../../services/api';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-student-table',
  imports: [MatTableModule, MatButton],
  templateUrl: './student-table.html',
  styleUrl: './student-table.scss'
})
export class StudentTable implements OnInit{
  studentsData: Student[] = [];

  apiService = inject(Api);
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'age'];

  ngOnInit(): void { 
    this.fetchStudents();
      
  }

  //--------------------Fetch Students--------------------
  fetchStudents(): void {
    this.apiService.getStudents().subscribe({
      next: (data) => {
        this.studentsData = data;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  openNewStudentModal(){

  }
}
