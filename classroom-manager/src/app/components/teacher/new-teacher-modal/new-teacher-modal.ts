import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Teacher } from '../../../models/models';
import { Api } from '../../../services/api';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-new-teacher-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './new-teacher-modal.html',
  styleUrl: './new-teacher-modal.scss'
})
export class NewTeacherModal implements OnInit{
  teacherForm!: FormGroup;

  fb = inject(FormBuilder);
  apiService = inject(Api);
  dialogRef = inject(MatDialogRef<NewTeacherModal>);
  snackService = inject(SnackbarService);

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required]]
    });
  }
  

  showError(controlName: string): boolean {
    const control = this.teacherForm.get(controlName);
    return !!control && (control.touched || control.dirty) && control.invalid;
  }


  getErrorMessage(controlName: string): string | null {
    const control = this.teacherForm.get(controlName);

    if (!control || !control.errors) return null;

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }


  onSubmit(){
    if(this.teacherForm.valid){
      const teacher = this.teacherForm.value as Teacher;
      this.apiService.postTeacher(teacher).subscribe({
        next: () => {
          this.snackService.success('Profesor creado con éxito');
          this.teacherForm.reset();
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackService.error('Error al crear profesor');
        }
      });
    }
    else{
      this.teacherForm.markAllAsTouched();
    }
  }
}
