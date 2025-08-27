import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackBar = inject(MatSnackBar);

  show(message: string, action: string = 'Cerrar', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


  success(message: string) {
    this.snackBar.open(message, '✔', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }


  error(message: string) {
    this.snackBar.open(message, '✖', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    });
  }


  warning(message: string) {
    this.snackBar.open(message, '⚠', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-warning']
    });
  }
}
