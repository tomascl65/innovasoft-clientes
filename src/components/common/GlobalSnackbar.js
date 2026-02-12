import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import { UIContext } from '../../contexts/UIContext';

const GlobalSnackbar = () => {
  const { snackbar, hideSnackbar } = useContext(UIContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar();
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
