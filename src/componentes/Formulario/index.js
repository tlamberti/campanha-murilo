import React, { useContext } from 'react';

import { Context } from '../../context';

import { TextField, Button } from '@material-ui/core';

import './style.css';

export default function Formulario() {
  const { 
    nome,
    celular,
    escritoPor,
    local,
    manipulaInput,
    cadastrarPessoa
  } = useContext(Context);

  
  return (
    <form className="container" onSubmit={cadastrarPessoa}>
      <TextField 
        value={nome}
        label="Nome" 
        onChange={e => manipulaInput(e.target.value, 'nome')}
      />
      <TextField 
        value={celular}
        label="Celular" 
        onChange={e => manipulaInput(e.target.value, 'celular')}
      />
      <TextField 
        value={escritoPor}
        label="Escrito por" 
        onChange={e => manipulaInput(e.target.value, 'escritoPor')}
      />
      <TextField 
        value={local}
        label="Local" 
        onChange={e => manipulaInput(e.target.value, 'local')}
      />

      <Button 
        type="submit"
        variant="contained" 
        color="primary">Enviar
      </Button>
  </form>
  )
}
