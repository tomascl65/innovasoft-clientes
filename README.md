# Innovasoft - Sistema de Gestión de Clientes

Aplicación React para la gestión de clientes desarrollada como prueba técnica para Innovasoft S.A.

## Características

- **Autenticación**: Login y registro de usuarios
- **Gestión de Clientes**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Diseño Responsive**: Compatible con dispositivos móviles, tablets y desktop
- **Material UI**: Interfaz moderna con estilo ejecutivo
- **Context API**: Manejo de estado global
- **Validaciones**: Validaciones en frontend para todos los formularios

## Tecnologías Utilizadas

- React 17.0.2
- React Router DOM 5.3.0
- Material UI 4.12.4
- Axios 0.27.2
- Context API con useReducer

## Requisitos Previos

- Node.js (versión 14 o superior)
- NPM (viene con Node.js)

## Instalación

1. Clonar o descargar el proyecto

2. Instalar dependencias:
```bash
npm install
```

## Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

## Compilación para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `build/`

## Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (imágenes, logos)
├── components/          # Componentes reutilizables
│   ├── layout/          # Componentes de layout (Header, Sidebar, etc.)
│   ├── common/          # Componentes comunes (Snackbar, Dialog, etc.)
│   └── auth/            # Componentes de autenticación
├── contexts/            # Context API (Auth, UI)
├── hooks/               # Custom hooks
├── pages/               # Páginas de la aplicación
│   ├── Login/
│   ├── Register/
│   ├── Home/
│   ├── Error404/
│   ├── ConsultaClientes/
│   └── MantenimientoClientes/
├── services/            # Configuración de Axios y servicios API
├── theme/               # Configuración del tema de Material UI
├── utils/               # Utilidades y constantes
├── App.js               # Componente principal
└── index.js             # Punto de entrada
```

## Funcionalidades

### Autenticación

- **Login**: Inicio de sesión con usuario y contraseña
  - Opción "Recuérdame" para guardar el usuario
  - Validación de campos obligatorios
  
- **Registro**: Creación de nuevos usuarios
  - Validación de email
  - Validación de contraseña (8-20 caracteres, 1 mayúscula, 1 minúscula, 1 número)

### Gestión de Clientes

- **Consulta de Clientes**
  - Filtros por nombre e identificación
  - Listado en tabla con acciones (Editar, Eliminar)
  - Confirmación antes de eliminar
  
- **Mantenimiento de Clientes**
  - Crear nuevos clientes
  - Editar clientes existentes
  - Carga de imagen (opcional, en base64)
  - Validaciones de todos los campos
  - Campos disponibles:
    - Nombre, Apellidos, Identificación
    - Teléfono Celular, Teléfono Otro
    - Dirección
    - Fecha de Nacimiento, Fecha de Afiliación
    - Sexo (Masculino/Femenino)
    - Reseña Personal
    - Imagen
    - Intereses (desde API)

### Navegación

- **Home**: Página de bienvenida con menú lateral
- **Error 404**: Página personalizada para rutas no encontradas
- **Rutas Protegidas**: Redirección automática al login si no está autenticado

## API

La aplicación consume los siguientes endpoints:

**Base URL**: `https://pruebareactjs.test-class.com/Api/`

### Autenticación
- `POST /api/Authenticate/login`
- `POST /api/Authenticate/register`

### Clientes
- `POST /api/Cliente/Listado`
- `GET /api/Cliente/Obtener/{id}`
- `POST /api/Cliente/Crear`
- `POST /api/Cliente/Actualizar`
- `DELETE /api/Cliente/Eliminar/{id}`

### Intereses
- `GET /api/Intereses/Listado`

## Características Técnicas

- **Componentes Funcionales**: Todos los componentes utilizan Hooks
- **Hooks Utilizados**: useState, useEffect, useReducer, useContext, useHistory, useLocation
- **Context API**: Manejo centralizado de autenticación y UI
- **Axios Interceptors**: 
  - Agregar automáticamente el Bearer Token
  - Manejo de errores globales (401, 500)
- **Validaciones**:
  - Frontend: Validación de tipos y longitudes
  - Feedback inmediato al usuario
- **Responsive Design**: 
  - Mobile First
  - Breakpoints de Material UI
  - Drawer colapsable en móviles
- **UX/UI**:
  - Snackbars para notificaciones
  - Diálogos de confirmación
  - Loading states
  - Mensajes de error descriptivos

## Diseño

El diseño sigue los principios de Material Design con un estilo ejecutivo:

- **Colores**: Azul oscuro (#0F2C4E), tonos grises, blanco
- **Tipografía**: Roboto
- **Componentes**: Material UI v4
- **Elevación**: Sombras sutiles
- **Espaciado**: Sistema de spacing de Material UI

## Notas Importantes

1. El token de autenticación se almacena en localStorage (si "Recuérdame" está marcado) o sessionStorage
2. Las imágenes se manejan en formato base64
3. El campo "Género" utiliza "M" para Masculino y "F" para Femenino
4. Todos los campos son obligatorios excepto la imagen
5. Se muestra confirmación antes de eliminar un cliente

## Créditos

Desarrollado como prueba técnica para **Innovasoft S.A.**

## Licencia

Este proyecto es de uso exclusivo para la prueba técnica de Innovasoft S.A.
