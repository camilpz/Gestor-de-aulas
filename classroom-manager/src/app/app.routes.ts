import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { LayoutModule } from '@angular/cdk/layout';
import { TeacherTable } from './components/teacher/teacher-table/teacher-table';
import { ClassroomTable } from './components/classroom/classroom-table/classroom-table';
import { Index } from './components/index';
import { StudentTable } from './components/student/student-table/student-table';

export const routes: Routes = [
    {
        path: '',
        component: Layout,           
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    
            { path: 'inicio', component: Index },
            { path: 'profesores', component: TeacherTable },
            { path: 'alumnos', component: StudentTable },
            { path: 'cursos', component: ClassroomTable },
        ],
    },
    { path: '**', redirectTo: '' },
];
