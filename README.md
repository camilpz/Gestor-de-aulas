# 📚 Gestor de Aulas

Este repositorio contiene un proyecto de portafolio de una aplicación web para la **gestión de aulas, profesores, estudiantes e inventario de recursos**.  
El proyecto fue diseñado para demostrar habilidades en el **desarrollo Full Stack (con un backend simulado)**, la manipulación de datos y la implementación de una **interfaz de usuario dinámica y profesional**.

---

## 🚀 Funcionalidades Principales

El objetivo principal de esta aplicación es permitir la gestión completa de entidades clave en un sistema educativo.

### 🔹 Gestión de Entidades (CRUD)
El proyecto implementa las operaciones básicas de **Crear, Leer, Actualizar y Eliminar** para las siguientes entidades:

- **Aulas**: Gestión de la información de las aulas, incluyendo los profesores, estudiantes y recursos asignados.  
- **Profesores**: Registro y edición de la información de los profesores.  
- **Estudiantes**: Registro y gestión de los datos de los estudiantes.  
- **Inventario de Aulas**: Administración de recursos de cada aula (ejemplo: proyectores, computadoras, sillas), incluyendo cantidad y estado.  

### 🔹 Relaciones de Datos
- **Aulas ↔ Estudiantes**: Relación muchos a muchos, ya que un estudiante puede estar inscrito en varias aulas y un aula puede tener múltiples estudiantes.  
- **Aulas ↔ Profesores**: Relación muchos a muchos, dado que un aula puede tener varios profesores asignados y un profesor puede enseñar en varias aulas.  
- **Aulas ↔ Recursos (Inventario)**: Relación uno a muchos, ya que un aula puede contar con múltiples recursos asignados a su inventario.  

### 🔹 Interfaz de Usuario
- Construida con **Angular Material** para garantizar una experiencia consistente, moderna y profesional.  

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Angular v20](https://angular.dev/)  
- **UI Library**: [Angular Material](https://material.angular.io/)  
- **Lenguaje**: TypeScript  
- **Backend simulado**: [JSON Server](https://github.com/typicode/json-server)  
- **Manejo de dependencias**: NPM  