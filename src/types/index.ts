// Tipos para Cliente
export interface Cliente {
  id: number;
  identificacion: string;
  nombre: string;
  apellidos: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: 'M' | 'F';
  resenaPersonal: string;
  imagen: string;
  interesesId: number;
}

// Tipos para Intereses
export interface Interes {
  id: number;
  descripcion: string;
}

// Tipos para Autenticación
export interface LoginResponse {
  token: string;
  userid: number;
  username: string;
  expiration: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  username: string | null;
  expiration: string | null;
  loading: boolean;
}

export interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'RESTORE_SESSION' | 'FINISH_LOADING';
  payload?: {
    token: string;
    userId: number;
    username: string;
    expiration: string;
  };
}

export interface AuthContextType extends AuthState {
  login: (
    token: string,
    userId: number,
    username: string,
    expiration: string,
    rememberMe?: boolean
  ) => void;
  logout: () => void;
}

// Tipos para UI Context
export interface UIState {
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
  dialog: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
  };
}

export interface UIAction {
  type: 'SHOW_SNACKBAR' | 'HIDE_SNACKBAR' | 'SHOW_DIALOG' | 'HIDE_DIALOG';
  payload?: {
    message?: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    onConfirm?: () => void;
  };
}

export interface UIContextType extends UIState {
  showSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
  hideSnackbar: () => void;
  showDialog: (title: string, message: string, onConfirm?: () => void) => void;
  hideDialog: () => void;
}

// Tipos para los formularios
export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}
