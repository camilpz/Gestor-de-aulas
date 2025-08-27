import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Api } from '../../../services/api';
import { SnackbarService } from '../../../services/snackbar-service';
import { Teacher } from '../../../models/models';

@Component({
  selector: 'app-edit-teacher-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-teacher-modal.html',
  styleUrls: ['./edit-teacher-modal.scss']
})
export class EditTeacherModal implements OnInit {
  teacherEditForm!: FormGroup;
  teacherId: string = inject<string>(MAT_DIALOG_DATA);
  status: 'view' | 'edit' = 'view';
  loading = false;

  private fb = inject(FormBuilder);
  private apiService = inject(Api);
  private snack = inject(SnackbarService);
  private dialogRef = inject(MatDialogRef<EditTeacherModal>);


  ngOnInit(): void {
    this.initForm();
    this.fetchTeacherData();
  }


  initForm() {
    this.teacherEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required]]
    });

    this.teacherEditForm.disable();
  }


  fetchTeacherData() {
    this.apiService.getTeacherById(this.teacherId).subscribe({
      next: (value) => {
        this.teacherEditForm.patchValue({
          name: value.name,
          subject: value.subject
        });
      }
    });
  }


  enableEdit() {
    this.status = 'edit';
    this.teacherEditForm.enable();
  }

  onSubmit() {
    if (this.teacherEditForm.invalid) {
      this.teacherEditForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const updatedTeacher = this.teacherEditForm.value as Teacher;

    this.apiService.putTeacher(this.teacherId, updatedTeacher).subscribe({
      next: () => {
        this.snack.success('Profesor actualizado con éxito');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.error('Error al actualizar profesor');
        this.loading = false;
      }
    });
  }

  //----------------------------------------Errors--------------------------------
  showError(controlName: string): boolean {
    const c = this.teacherEditForm.get(controlName);
    return !!c && (c.touched || c.dirty) && c.invalid;
  }


  getErrorMessage(controlName: string): string | null {
    const c = this.teacherEditForm.get(controlName);
    if (!c || !c.errors) return null;
    if (c.errors['required']) return 'Este campo es obligatorio';
    if (c.errors['minlength']) return `Debe tener al menos ${c.errors['minlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }
}
