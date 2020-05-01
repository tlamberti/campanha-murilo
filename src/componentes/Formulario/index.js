import React, { useContext } from 'react';

import { Context } from '../../context';

import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core';

import './style.css';

export default function Formulario() {
  const { 
    nome,
    celular,
    vinculo,
    statusAtual,
    manipulaInput,
    cadastrarPessoa,
    user,
    cancelEdit,
    idPessoa
  } = useContext(Context);

  const statusList = [
    {
      id: 1,
      status: 'Visitar',
    },
    {
      id: 2,
      status: 'Voluntário',
    },
    {
      id: 3,
      status: 'Só Vota',
    },
    {
      id: 4,
      status: 'Não Apoia',
    }, 
  ]
  
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
        value={vinculo}
        label="Vínculo (trabalho, vizinho(a), etc.)" 
        onChange={e => manipulaInput(e.target.value, 'vinculo')}
        required
      />
      <FormControl>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          value={statusAtual} 
          label="Status" 
          onChange={e => manipulaInput(e.target.value, 'status')}
          required
        >
          {statusList?.map((status, index) => (
            <MenuItem 
              key={index}
              value={status.status}
            >
              {status.status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        type="submit"
        variant="contained" 
        color="primary">Enviar
      </Button>
      {idPessoa && <Button variant="contained" color="secondary" onClick={() => cancelEdit()}>Cancelar</Button>}
  </form>
  )
}
