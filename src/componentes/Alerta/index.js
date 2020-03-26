import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alerta = ({ open, handleDialog, removePessoa }) => {

  return (
    <Dialog
      open={open}
      onClose={handleDialog}
    >
      <DialogTitle id="alert-dialog-title">Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir essa pessoa?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => removePessoa()} color="primary">
          Sim
        </Button>
        <Button onClick={() => handleDialog(false)} color="primary" autoFocus>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alerta