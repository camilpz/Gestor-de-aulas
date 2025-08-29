import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar-service';
import { Api } from '../../../services/api';
import { Student } from '../../../models/models';
import { FormErrorService } from '../../../services/form-error-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-student-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-student-modal.html',
  styleUrl: './edit-student-modal.scss'
})
export class EditStudentModal {
  studentEditForm!: FormGroup;
  studentData: Student = inject<Student>(MAT_DIALOG_DATA);
  status: 'view' | 'edit' = 'view';
  loading = false;

  private fb = inject(FormBuilder);
  private apiService = inject(Api);
  private snack = inject(SnackbarService);
  private dialogRef = inject(MatDialogRef<EditStudentModal>);
  private formErrorService = inject(FormErrorService);


  ngOnInit(): void {
    this.initForm();
    this.fetchStudentData();

  }


  initForm() {
    this.studentEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, this.ageValidator.bind(this)]]
    });

    console.log(this.studentEditForm.value);


    this.studentEditForm.disable();
  }


  fetchStudentData() {
    this.apiService.getStudentById(this.studentData.id).subscribe({
      next: (value) => {
        this.studentEditForm.patchValue({
          name: value.name,
          age: value.age
        });
      }
    });
  }


  enableEdit() {
    this.status = 'edit';
    this.studentEditForm.enable();
  }


  onSubmit() {
    if (this.studentEditForm.invalid) {
      this.studentEditForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const updatedStudent = this.studentEditForm.value as Student;

    this.apiService.putStudent(this.studentData.id, updatedStudent).subscribe({
      next: () => {
        this.snack.success('Estudiante actualizado con éxito');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.error('Error al actualizar estudiante');
        this.loading = false;
      }
    });
  }

  //----------------------------------------Errors--------------------------------
  showError(controlName: string): boolean {
    return this.formErrorService.showError(this.studentEditForm.get(controlName));
  }


  getErrorMessage(controlName: string): string | null {
    return this.formErrorService.getMessage(this.studentEditForm.get(controlName));
  }

  

  //-------------------------------------Validators-------------------------------------
  ageValidator(control: AbstractControl) {
    const age = control.value;
    if (age && (age < 17)) {
      return { invalidAge: true };
    }
    return null;
  }
}
