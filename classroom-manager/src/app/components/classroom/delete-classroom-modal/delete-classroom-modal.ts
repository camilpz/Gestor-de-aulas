import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Api } from '../../../services/api';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-delete-classroom-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-classroom-modal.html',
  styleUrl: './delete-classroom-modal.scss'
})
export class DeleteClassroomModal {
  classroom = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteClassroomModal>);
  api = inject(Api);
  snack = inject(SnackbarService);
  loading = false;

  delete() {
    this.loading = true;
    this.api.deleteClassroom(this.classroom.id).subscribe({
      next: () => {
        this.snack.success('Aula eliminada con éxito');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.error('Error al eliminar el aula');
        this.loading = false;
      }
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
