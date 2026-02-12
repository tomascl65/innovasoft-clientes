import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useContext } from 'react';
import { UIContext } from '../../contexts/UIContext';

const ConfirmDialog = () => {
  const { dialog, hideDialog } = useContext(UIContext);

  const handleConfirm = () => {
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
    hideDialog();
  };

  const handleCancel = () => {
    hideDialog();
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">{dialog.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
