import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../../../models/models';
import { Api } from '../../../services/api';
import { NewStudentModal } from '../new-student-modal/new-student-modal';
import { SnackbarService } from '../../../services/snackbar-service';
import { EditStudentModal } from '../edit-student-modal/edit-student-modal';

@Component({
  selector: 'app-student-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './student-table.html',
  styleUrl: './student-table.scss'
})
export class StudentTable implements OnInit {
  studentsData: Student[] = [];

  apiService = inject(Api);
  dialog = inject(MatDialog);
  snackService = inject(SnackbarService);

  displayedColumns: string[] = ['id', 'name', 'age', 'actions'];

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

  openNewStudentModal() {
    const dialogRef = this.dialog.open(NewStudentModal,
      {
        width: '400px',
        panelClass: 'custom-dialog-panel',
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchStudents();
      }
    });
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(EditStudentModal,
      {
        width: '400px',
        panelClass: 'custom-dialog-panel',
        disableClose: true,
        data: student
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchStudents();
      }
    });
  }

  deleteStudent(studentId: string) {
    this.apiService.deleteStudent(studentId).subscribe({
      next: () => {
        this.fetchStudents();
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }
}
