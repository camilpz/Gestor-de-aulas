import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../../services/api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormErrorService } from '../../../services/form-error-service';
import { Student } from '../../../models/models';
import { SnackbarService } from '../../../services/snackbar-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-student-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './new-student-modal.html',
  styleUrl: './new-student-modal.scss'
})
export class NewStudentModal implements OnInit {
  studentForm!: FormGroup;

  dialogRef = inject(MatDialogRef<NewStudentModal>);

  fb = inject(FormBuilder);
  apiService = inject(Api);
  snackService = inject(SnackbarService);
  formErrorService = inject(FormErrorService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [0, [Validators.required, this.ageValidator.bind(this)]]
    });
  }

  showError(controlName: string): boolean {
    return this.formErrorService.showError(this.studentForm.get(controlName));
  }


  getErrorMessage(controlName: string): string | null {
    return this.formErrorService.getMessage(this.studentForm.get(controlName));
  }

  ageValidator(control: AbstractControl) {
    const age = control.value;
    if (age && (age < 17)) {
      return { invalidAge: true };
    }
    return null;
  }

  onSubmit(){
    if(this.studentForm.valid){
      const student = this.studentForm.value as Student;
      this.apiService.postStudent(student).subscribe({
        next: () => {
          this.snackService.success('Estudiante creado con éxito');
          this.studentForm.reset();
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackService.error('Error al crear estudiante');
        }
      });
    }
  }
}
