# 🚀 Inicio Rápido - Innovasoft Clientes

## Proyecto React JS Completo - Listo para Ejecutar

Este proyecto implementa completamente la prueba técnica de React JS para Innovasoft S.A.

---

## ⚡ Instalación Rápida

### 1. Descargar el proyecto
- Descarga el archivo `innovasoft-clientes.zip`
- Extrae el contenido en tu carpeta de trabajo

### 2. Instalar dependencias
Abre una terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### 3. Ejecutar la aplicación
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

---

## 📋 Lo que Incluye

### ✅ Funcionalidades Implementadas

**Autenticación**
- ✅ Login con validaciones
- ✅ Registro de usuarios con validación de email y contraseña
- ✅ Función "Recuérdame" para guardar usuario
- ✅ Manejo de tokens JWT
- ✅ Sesión persistente

**Gestión de Clientes**
- ✅ Listado de clientes con filtros
- ✅ Crear nuevos clientes
- ✅ Editar clientes existentes
- ✅ Eliminar clientes con confirmación
- ✅ Carga de imágenes en base64
- ✅ Validaciones completas de todos los campos

**Navegación y UX**
- ✅ Página Home con menú lateral
- ✅ Página Error 404 personalizada
- ✅ Rutas protegidas
- ✅ Notificaciones con Snackbar
- ✅ Diálogos de confirmación
- ✅ Diseño responsive (móvil, tablet, desktop)

### 🛠️ Tecnologías Utilizadas

- **React 17.0.2** - Componentes funcionales con Hooks
- **React Router DOM 5.3.0** - Navegación
- **Material UI 4.12.4** - Componentes UI con estilo ejecutivo
- **Axios 0.27.2** - Consumo de API con interceptores
- **Context API** - Manejo de estado global
- **useReducer** - Manejo de estado complejo

### 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/          # MainLayout con AppBar y Drawer
│   └── common/          # Componentes reutilizables
├── contexts/            # AuthContext y UIContext
├── pages/               # Todas las páginas de la app
│   ├── Login/
│   ├── Register/
│   ├── Home/
│   ├── Error404/
│   ├── ConsultaClientes/
│   └── MantenimientoClientes/
├── services/            # Configuración de Axios
└── theme/               # Tema personalizado Material UI
```

---

## 🎨 Características de Diseño

- **Tema Ejecutivo**: Azul oscuro (#0F2C4E), grises, blanco
- **Responsive**: Se adapta a todos los tamaños de pantalla
- **Material Design**: Siguiendo las guías de Google
- **Componentes Material UI**: AppBar, Drawer, Table, Dialog, Snackbar, etc.

---

## 🔐 Seguridad

- Tokens JWT para autenticación
- Interceptores Axios para agregar token automáticamente
- Rutas protegidas con redirección automática
- Validación de expiración de tokens
- Limpieza automática de sesión en errores 401

---

## 📝 Campos del Formulario de Cliente

Todos obligatorios excepto imagen:
- Nombre (max 50 caracteres)
- Apellidos (max 100 caracteres)
- Identificación (max 20 caracteres)
- Teléfono Celular (max 20 caracteres)
- Teléfono Otro (max 20 caracteres)
- Dirección (max 200 caracteres)
- Fecha de Nacimiento
- Fecha de Afiliación
- Sexo (M/F)
- Reseña Personal (max 200 caracteres)
- Imagen (opcional, base64)
- Intereses (desde API)

---

## 🌐 API Integrada

**URL Base**: `https://pruebareactjs.test-class.com/Api/`

### Endpoints Implementados

**Autenticación**
- `POST api/Authenticate/login`
- `POST api/Authenticate/register`

**Clientes**
- `POST api/Cliente/Listado`
- `GET api/Cliente/Obtener/{id}`
- `POST api/Cliente/Crear`
- `POST api/Cliente/Actualizar`
- `DELETE api/Cliente/Eliminar/{id}`

**Intereses**
- `GET api/Intereses/Listado`

---

## 🧪 Pruebas

### Para probar la aplicación:

1. **Registra un usuario**
   - Usuario: tu_usuario
   - Email: email@valido.com
   - Contraseña: Password1 (mínimo 8 chars, 1 mayúscula, 1 minúscula, 1 número)

2. **Inicia sesión** con las credenciales creadas

3. **Navega a Consulta Clientes** desde el menú lateral

4. **Crea un cliente nuevo** con todos los datos

5. **Edita el cliente** usando el ícono de lápiz

6. **Elimina el cliente** usando el ícono de papelera (requiere confirmación)

---

## 📚 Documentación Adicional

- **README.md**: Documentación completa del proyecto
- **INSTALACION.md**: Guía detallada de instalación y troubleshooting
- **Comentarios en código**: Explicaciones en partes clave

---

## ⚙️ Comandos Disponibles

```bash
npm start          # Inicia la aplicación en desarrollo
npm run build      # Compila para producción
npm test           # Ejecuta tests (si están configurados)
```

---

## 🎯 Cumplimiento de Requisitos

### Lineamientos Técnicos
- ✅ React JS v17
- ✅ ECMAScript 6
- ✅ Componentes Funcionales
- ✅ React Hooks (useState, useEffect, useReducer, useContext)
- ✅ Context API para estado global
- ✅ Axios para consumo de API
- ✅ async/await
- ✅ React Router DOM
- ✅ SPA (Single Page Application)
- ✅ Create React App
- ✅ NPM Package Manager

### Diseño
- ✅ Material UI 4.12.4
- ✅ Material Design principles
- ✅ Responsive design
- ✅ Estilo ejecutivo

### Funcionalidades
- ✅ Login con validaciones
- ✅ Registro con validaciones
- ✅ "Recuérdame" funcional
- ✅ Home con menú lateral
- ✅ Página Error 404
- ✅ Consulta de clientes con filtros
- ✅ CRUD completo de clientes
- ✅ Manejo de imágenes en base64
- ✅ Validaciones completas
- ✅ Notificaciones Snackbar
- ✅ Diálogos de confirmación

---

## 🚨 Notas Importantes

1. **Node Modules**: No incluidos en el ZIP - ejecutar `npm install` para instalarlos
2. **Conexión a Internet**: Necesaria para acceder a la API
3. **Token**: Se guarda automáticamente y se incluye en todas las peticiones
4. **Imágenes**: Se manejan en formato base64
5. **Validaciones**: Se realizan tanto en frontend como en backend

---

## ✨ Extras Implementados

- Loading states en todas las operaciones asíncronas
- Manejo de errores detallado
- Limpieza de estado al desmontar componentes
- Persistencia de sesión
- Auto-logout en token expirado
- Feedback visual en todas las acciones

---

## 📞 Soporte

Si tienes alguna duda sobre la implementación:
1. Revisa README.md para documentación completa
2. Revisa INSTALACION.md para troubleshooting
3. Los comentarios en el código explican secciones complejas

---

## 🎉 ¡Listo para Usar!

El proyecto está completamente funcional y listo para ejecutarse.
Solo necesitas instalar las dependencias con `npm install` y ejecutar `npm start`.

**¡Éxito con la prueba técnica!** 🚀
