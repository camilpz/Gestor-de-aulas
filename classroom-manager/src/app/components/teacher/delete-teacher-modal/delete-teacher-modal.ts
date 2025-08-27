import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Api } from '../../../services/api';
import { SnackbarService } from '../../../services/snackbar-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-teacher-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-teacher-modal.html',
  styleUrl: './delete-teacher-modal.scss'
})
export class DeleteTeacherModal {
  teacherId = inject<string>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteTeacherModal>);

  api = inject(Api);
  snackService = inject(SnackbarService);

  delete(){
    if (this.teacherId) {
      this.api.deleteTeacher(this.teacherId).subscribe({
        next: () => {
          this.snackService.success('Profesor eliminado con éxito');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackService.error('Error al eliminar profesor');
        }
      });
    }
  }
}
