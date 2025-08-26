import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Teacher } from '../../models/models';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teacher-table',
  imports: [MatTableModule],
  templateUrl: './teacher-table.html',
  styleUrl: './teacher-table.scss'
})
export class TeacherTable implements OnInit {
  teachersData: Teacher[] = [];

  apiService = inject(Api);

  // './teacher-table.html'

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
}
