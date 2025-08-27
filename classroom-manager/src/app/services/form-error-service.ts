import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

type MsgMap = Record<string, (err: any, control?: AbstractControl) => string>;

@Injectable({
  providedIn: 'root'
})

export class FormErrorService {
  
  private defaultMessages: MsgMap = {
    required: () => 'Este campo es obligatorio',
    minlength: (e) => `Debe tener al menos ${e.requiredLength} caracteres`,
    maxlength: (e) => `Debe tener como máximo ${e.requiredLength} caracteres`,
    email:     () => 'Formato de correo inválido',
    pattern:   () => 'Formato inválido',
    min:       (e) => `El mínimo permitido es ${e.min}`,
    max:       (e) => `El máximo permitido es ${e.max}`,
    invalidAge: () => 'La edad mínima permitida es 18 años',
  };

  //--------------------------------Mostrar el error--------------------------------
  showError(control: AbstractControl | null | undefined): boolean {
    return !!control && (control.touched || control.dirty) && control.invalid;
  }


  //--------------------------------Primer mensaje (para <mat-error> simple)--------------------------------
  getMessage(control: AbstractControl | null | undefined, custom?: MsgMap): string | null {
    const msgs = this.getMessages(control, custom);
    return msgs.length ? msgs[0] : null;
  }


  //--------------------------------Lista de mensajes (para mostrar todos los errores)------------------
  getMessages(control: AbstractControl | null | undefined, custom?: MsgMap): string[] {
    if (!control || !control.errors) return [];
    const map = { ...this.defaultMessages, ...(custom ?? {}) };
    return this.errorsToMessages(control.errors, map, control);
  }


  //----------------------------------------Helpers-------------------------------------
  private errorsToMessages(errors: ValidationErrors, map: MsgMap, control?: AbstractControl): string[] {
    const keys = Object.keys(errors);
    const out: string[] = [];
    for (const key of keys) {
      const errVal = (errors as any)[key];
      const toMsg = map[key];
      if (typeof toMsg === 'function') out.push(toMsg(errVal, control));
      else out.push('Campo inválido'); 
    }
    return out;
  }
}
