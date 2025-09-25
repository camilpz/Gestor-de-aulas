import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Api } from '../../../services/api';
import { SnackbarService } from '../../../services/snackbar-service';
import { FormErrorService } from '../../../services/form-error-service';

@Component({
  selector: 'app-new-classroom-modal',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-classroom-modal.html',
  styleUrl: './new-classroom-modal.scss'
})
export class NewClassroomModal {
  dialogRef = inject(MatDialogRef<NewClassroomModal>);
  api = inject(Api);
  snack = inject(SnackbarService);
  fb = inject(FormBuilder);
  formError = inject(FormErrorService);
  loading = false;
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['Aula ', [Validators.required, Validators.minLength(3)]]
    });
  }

  showError(controlName: string) {
    return this.formError.showError(this.form.get(controlName));
  }
  getErrorMessage(controlName: string) {
    return this.formError.getMessage(this.form.get(controlName));
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    const classroom = {
      ...this.form.value,
      teachersIds: [],
      studentsIds: [],
      resourcesIds: []
    };
    this.api.postClassroom(classroom).subscribe({
      next: () => {
        this.snack.success('Aula creada');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.error('Error al crear aula');
        this.loading = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
