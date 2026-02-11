# Guía de Instalación y Despliegue

## Paso a Paso - Instalación Local

### 1. Verificar Requisitos

Asegúrate de tener instalado:
- Node.js (versión 14 o superior)
- NPM (viene incluido con Node.js)

Para verificar:
```bash
node --version
npm --version
```

### 2. Descargar el Proyecto

Descarga y extrae el proyecto en tu directorio de trabajo.

### 3. Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- React 17.0.2
- React Router DOM 5.3.0
- Material UI 4.12.4
- Axios 0.27.2
- Y todas las demás dependencias

### 4. Iniciar la Aplicación

Una vez instaladas las dependencias, ejecuta:

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

Si no se abre automáticamente, abre manualmente esa URL en tu navegador.

### 5. Probar la Aplicación

1. **Crear una cuenta**: Haz clic en "¿No tiene una cuenta? Regístrese"
   - Ingresa un nombre de usuario
   - Ingresa un email válido
   - Ingresa una contraseña (8-20 caracteres, 1 mayúscula, 1 minúscula, 1 número)
   - Haz clic en "REGISTRARME"

2. **Iniciar sesión**: Serás redirigido a la página de login
   - Ingresa tu usuario y contraseña
   - Opcionalmente marca "Recuérdame"
   - Haz clic en "INICIAR SESIÓN"

3. **Navegar en la aplicación**:
   - Verás la página de bienvenida
   - Usa el menú lateral para ir a "Consulta Clientes"
   - Crea, edita y elimina clientes

## Compilación para Producción

Para crear una versión optimizada:

```bash
npm run build
```

Esto creará una carpeta `build/` con los archivos estáticos optimizados.

## Estructura de Archivos Generados

```
innovasoft-clientes/
├── node_modules/        # Dependencias (generado con npm install)
├── public/              # Archivos públicos estáticos
│   └── index.html
├── src/                 # Código fuente
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── theme/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

## Solución de Problemas Comunes

### Error: "npm not found"
- Instala Node.js desde https://nodejs.org/

### Error al instalar dependencias
- Elimina la carpeta `node_modules` y el archivo `package-lock.json`
- Ejecuta `npm install` nuevamente

### Puerto 3000 ya en uso
- Cierra otras aplicaciones que usen el puerto 3000
- O cambia el puerto usando: `PORT=3001 npm start` (en Mac/Linux)

### Error de CORS
- Verifica que la API esté accesible
- La API ya tiene configurado CORS correctamente

### La aplicación no conecta con la API
- Verifica tu conexión a Internet
- La URL base de la API es: `https://pruebareactjs.test-class.com/Api/`

## Credenciales de Prueba

Puedes crear tus propias credenciales usando el registro, o usar estas de prueba (si están disponibles):

**Nota**: Las credenciales deben crearse usando el formulario de registro de la aplicación.

## API Endpoints Disponibles

### Autenticación
- **Login**: POST `api/Authenticate/login`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Registro**: POST `api/Authenticate/register`
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string"
  }
  ```

### Clientes (requieren token)
- **Listar**: POST `api/Cliente/Listado`
- **Obtener**: GET `api/Cliente/Obtener/{id}`
- **Crear**: POST `api/Cliente/Crear`
- **Actualizar**: POST `api/Cliente/Actualizar`
- **Eliminar**: DELETE `api/Cliente/Eliminar/{id}`

### Intereses
- **Listar**: GET `api/Intereses/Listado`

## Características de Seguridad

- Tokens JWT para autenticación
- Rutas protegidas que requieren autenticación
- Redirección automática al login si el token expira
- Validación de entrada en todos los formularios

## Soporte

Para cualquier problema o pregunta sobre la implementación, revisar:
1. El archivo README.md
2. Los comentarios en el código fuente
3. La documentación de la API en: https://pruebareactjs.test-class.com/Api/swagger/index.html

## Siguiente Pasos (Mejoras Opcionales)

Si deseas extender la aplicación:
1. Agregar paginación al listado de clientes
2. Implementar búsqueda en tiempo real
3. Agregar más filtros de búsqueda
4. Implementar exportación a Excel/PDF
5. Agregar dashboard con estadísticas
6. Implementar modo oscuro
7. Agregar internacionalización (i18n)
