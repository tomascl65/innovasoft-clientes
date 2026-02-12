import { createContext, useReducer, ReactNode } from 'react';
import { UIState, UIAction, UIContextType } from '../types';

const initialState: UIState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
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
} as const;

// Reducer
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UI_TYPES.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload!.message!,
          severity: action.payload!.severity || 'info',
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
          title: action.payload!.title!,
          message: action.payload!.message!,
          onConfirm: action.payload!.onConfirm || null,
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

export const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info' = 'info',
  ) => {
    dispatch({
      type: UI_TYPES.SHOW_SNACKBAR,
      payload: { message, severity },
    });
  };

  const hideSnackbar = () => {
    dispatch({ type: UI_TYPES.HIDE_SNACKBAR });
  };

  const showDialog = (title: string, message: string, onConfirm?: () => void) => {
    dispatch({
      type: UI_TYPES.SHOW_DIALOG,
      payload: { title, message, onConfirm },
    });
  };

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
