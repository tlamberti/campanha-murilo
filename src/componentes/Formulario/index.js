import React, { useContext } from 'react';

import { Context } from '../../context';

import { TextField, Button } from '@material-ui/core';

import './style.css';

export default function Formulario() {
  const { 
    nome,
    celular,
    local,
    manipulaInput,
    cadastrarPessoa,
    user
  } = useContext(Context);

  
  return (
    <form className="container" onSubmit={cadastrarPessoa}>
      <TextField 
        value={nome}
        label="Nome" 
        onChange={e => manipulaInput(e.target.value, 'nome')}
        required
      />
      <TextField 
        value={celular}
        label="Celular" 
        onChange={e => manipulaInput(e.target.value, 'celular')}
        required
      />
      <TextField 
        value={user.email}
        label="Escrito por" 
        onChange={e => manipulaInput(e.target.value, 'escritoPor')}
        disabled
      />
      <TextField 
        value={local}
        label="Local" 
        onChange={e => manipulaInput(e.target.value, 'local')}
        required
      />

      <Button 
        type="submit"
        variant="contained" 
        color="primary">Enviar
      </Button>
  </form>
  )
}
