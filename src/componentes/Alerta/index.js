import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alerta = ({ open, nao, sim, titulo, descricao }) => {

  return (
    <Dialog
      open={open}
      onClose={nao}
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {descricao}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => sim()} color="primary">
          Sim
        </Button>
        <Button onClick={() => nao(false)} color="primary" autoFocus>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alerta