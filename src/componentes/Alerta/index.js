import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alerta = ({ open, setOpen, removePessoa }) => {

  const excluiPessoa = () => {
    setOpen(false);
    removePessoa();
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir essa pessoa?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => removePessoa(' ', 'sim')} color="primary">
          Sim
        </Button>
        <Button onClick={(handleClose)} color="primary" autoFocus>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alerta