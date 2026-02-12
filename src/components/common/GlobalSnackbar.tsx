import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import { useContext, SyntheticEvent } from 'react';
import { UIContext } from '../../contexts/UIContext';

const GlobalSnackbar: React.FC = () => {
  const uiContext = useContext(UIContext);

  if (!uiContext) {
    throw new Error('GlobalSnackbar must be used within a UIProvider');
  }

  const { snackbar, hideSnackbar } = uiContext;

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar();
  };

  const handleAlertClose = (event: SyntheticEvent) => {
    hideSnackbar();
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleAlertClose} severity={snackbar.severity} variant="filled">
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
