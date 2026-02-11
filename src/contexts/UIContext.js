import React, { createContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  },
  dialog: {
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  },
};

// Tipos de acciones
const UI_TYPES = {
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

// Reducer
const uiReducer = (state, action) => {
  switch (action.type) {
    case UI_TYPES.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity || 'info',
        },
      };
    
    case UI_TYPES.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };
    
    case UI_TYPES.SHOW_DIALOG:
      return {
        ...state,
        dialog: {
          open: true,
          title: action.payload.title,
          message: action.payload.message,
          onConfirm: action.payload.onConfirm,
        },
      };
    
    case UI_TYPES.HIDE_DIALOG:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          open: false,
        },
      };
    
    default:
      return state;
  }
};

// Crear contexto
export const UIContext = createContext();

// Provider
export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Mostrar Snackbar
  const showSnackbar = (message, severity = 'info') => {
    dispatch({
      type: UI_TYPES.SHOW_SNACKBAR,
      payload: { message, severity },
    });
  };

  // Ocultar Snackbar
  const hideSnackbar = () => {
    dispatch({ type: UI_TYPES.HIDE_SNACKBAR });
  };

  // Mostrar Dialog
  const showDialog = (title, message, onConfirm) => {
    dispatch({
      type: UI_TYPES.SHOW_DIALOG,
      payload: { title, message, onConfirm },
    });
  };

  // Ocultar Dialog
  const hideDialog = () => {
    dispatch({ type: UI_TYPES.HIDE_DIALOG });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        showSnackbar,
        hideSnackbar,
        showDialog,
        hideDialog,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
