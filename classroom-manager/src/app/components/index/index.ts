import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-index',
  imports: [MatGridListModule, MatCardModule, RouterLink, MatIconModule],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
  info = [
  {
    title: 'Profesores',
    description: 'Gestioná la lista de profesores.',
    link: '/profesores',
    icon: 'school'
  },
  {
    title: 'Alumnos',
    description: 'Administrá los alumnos registrados.',
    link: '/alumnos',
    icon: 'group'
  },
  {
    title: 'Cursos',
    description: 'Creá y editá cursos fácilmente.',
    link: '/cursos',
    icon: 'menu_book'
  }
];



}
