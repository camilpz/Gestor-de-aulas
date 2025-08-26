import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [MatGridListModule, MatCardModule, RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
  info = [
  { title: 'Profesores', description: 'Gestioná tus docentes de forma sencilla.', link: '/profesores' },
  { title: 'Alumnos', description: 'Administrá los estudiantes y sus datos.', link: '/alumnos' },
  { title: 'Cursos', description: 'Organizá y asigná las aulas y cursos.', link: '/cursos' }
];

}
