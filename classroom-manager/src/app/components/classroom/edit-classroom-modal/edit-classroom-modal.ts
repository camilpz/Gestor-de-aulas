import { Component, OnInit, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Api } from '../../../services/api';
import { SnackbarService } from '../../../services/snackbar-service';
import { FormErrorService } from '../../../services/form-error-service';
import { Classroom, Teacher } from '../../../models/models';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-edit-classroom-modal',
  standalone: true,
  imports: [
    MatDialogModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatChipsModule
  ],
  templateUrl: './edit-classroom-modal.html',
  styleUrl: './edit-classroom-modal.scss'
})
export class EditClassroomModal implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public classroom: Classroom) {}

  private dialogRef = inject(MatDialogRef<EditClassroomModal, boolean>);
  private api       = inject(Api);
  private snack     = inject(SnackbarService);
  private fb        = inject(FormBuilder);
  private formError = inject(FormErrorService);

  loading = false;
  form!: FormGroup;

  allTeachers: Teacher[] = [];
  selectedTeachers: string[] = [];
  unassignedTeachers: Teacher[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.classroom?.name ?? '', [Validators.required, Validators.minLength(3)]],
  teacherToAdd: [null]
    });

    this.api.getAllTeachers().subscribe({
      next: (all: Teacher[]) => {
        this.allTeachers = all ?? [];
        const current = Array.isArray(this.classroom?.teachersId)
          ? this.classroom!.teachersId!.map(v => String(v).trim()).filter(Boolean)
          : [];
        this.selectedTeachers = current;
        this.computeUnassigned();
      },
      error: () => {
        this.allTeachers = [];
        this.computeUnassigned();
      }
    });
  }

  private computeUnassigned(): void {
    const set = new Set(this.selectedTeachers.map(s => s.trim()));
    this.unassignedTeachers = this.allTeachers.filter(t => {
      const tid = String((t as any).id ?? '').trim();
      return tid && !set.has(tid);
    });
  }

  addTeacher(): void {
  const raw = this.form.get('teacherToAdd')?.value as unknown;
    const id = String(raw ?? '').trim();
    if (!id) return;

    const already = this.selectedTeachers.some(s => s.trim() === id);
    if (!already) {
      this.selectedTeachers = [...this.selectedTeachers, id];
      this.computeUnassigned();
    }
    this.form.get('teacherToAdd')?.setValue(null);
  }

  removeTeacher(id: string): void {
    const tid = String(id).trim();
    this.selectedTeachers = this.selectedTeachers.filter(s => s.trim() !== tid);
    this.computeUnassigned();
  }

  getTeacherName(id: string): string {
    const tid = String(id).trim();
    return this.allTeachers.find(t => String((t as any).id ?? '').trim() === tid)?.name ?? tid;
  }

  showError(controlName: string): boolean {
    return this.formError.showError(this.form.get(controlName));
  }

  getErrorMessage(controlName: string): string | null {
    return this.formError.getMessage(this.form.get(controlName));
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const updated: Classroom = {
      ...this.classroom,
      name: this.form.value.name,
  teachersId: this.selectedTeachers
    };

    this.api.putClassroom(String(this.classroom.id), updated).subscribe({
      next: () => {
        this.snack.success('Aula actualizada');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.error('Error al actualizar aula');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
