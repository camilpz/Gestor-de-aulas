import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Api } from '../../services/api';
import { SnackbarService } from '../../services/snackbar-service';
import { Resource, Classroom } from '../../models/models';
import { FormErrorService } from '../../services/form-error-service';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-resource-classroom-modal',
    standalone: true,
    imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule],
    templateUrl: './add-resource-classroom-modal.html',
    styleUrl: './add-resource-classroom-modal.scss'
})
export class AddResourceClassroomModal implements OnInit {
    classroom = inject(MAT_DIALOG_DATA) as Classroom;
    dialogRef = inject(MatDialogRef<AddResourceClassroomModal>);
    api = inject(Api);
    snack = inject(SnackbarService);
    fb = inject(FormBuilder);
    formError = inject(FormErrorService);
    loading = false;
    form!: FormGroup;
    resources: Resource[] = [];

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.required],
            quantity: [null, [Validators.required, Validators.min(1)]]
        });
        this.api.getAllResources().subscribe((data: Resource[]) => {
            this.resources = data;
        });
    }

    showError(controlName: string): boolean {
        return this.formError.showError(this.form.get(controlName));
    }
    getErrorMessage(controlName: string): string | null {
        return this.formError.getMessage(this.form.get(controlName));
    }

    save() {
        if (this.form.invalid) return;
        const { name, quantity } = this.form.value;
        const newResource = {
            id: Date.now().toString(),
            name,
            quantity: {
                total: Number(quantity),
                available: 0,
                inUse: 0,
                underMaintenance: 0
            }
        };
        const updated = {
            ...this.classroom,
            resources: [...(this.classroom.resources || []), newResource]
        };
        this.loading = true;
        this.api.putClassroom(this.classroom.id, updated).subscribe({
            next: () => {
                this.snack.success('Recurso agregado');
                this.dialogRef.close(true);
            },
            error: () => {
                this.snack.error('Error al agregar recurso');
                this.loading = false;
            }
        });
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
