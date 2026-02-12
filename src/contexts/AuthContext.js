import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  username: null,
  expiration: null,
  loading: true,
};

// Tipos de acciones
const AUTH_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RESTORE_SESSION: 'RESTORE_SESSION',
  FINISH_LOADING: 'FINISH_LOADING',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        expiration: action.payload.expiration,
        loading: false,
      };

    case AUTH_TYPES.LOGOUT:
      return {
        ...initialState,
        loading: false,
      };

    case AUTH_TYPES.RESTORE_SESSION:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        expiration: action.payload.expiration,
        loading: false,
      };

    case AUTH_TYPES.FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar sesión al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');
    const expiration = localStorage.getItem('expiration') || sessionStorage.getItem('expiration');

    if (token && userId && username && expiration) {
      const expirationDate = new Date(expiration);
      const now = new Date();

      if (expirationDate > now) {
        dispatch({
          type: AUTH_TYPES.RESTORE_SESSION,
          payload: { token, userId, username, expiration },
        });
      } else {
        // Token expirado, limpiar
        logout();
      }
    } else {
      dispatch({ type: AUTH_TYPES.FINISH_LOADING });
    }
  }, []);

  const login = (token, userId, username, expiration, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('token', token);
    storage.setItem('userId', userId);
    storage.setItem('username', username);
    storage.setItem('expiration', expiration);

    dispatch({
      type: AUTH_TYPES.LOGIN,
      payload: { token, userId, username, expiration },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('expiration');

    dispatch({ type: AUTH_TYPES.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
