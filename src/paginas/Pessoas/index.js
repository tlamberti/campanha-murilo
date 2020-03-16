import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Tabela from '../../componentes/Tabela';

const Pessoas = () => {

  const { fetchLista, lista, setLista } = useContext(Context);
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [escritoPor, setEscritoPor] = useState('');
  const [local, setLocal] = useState('');

  useEffect(() => {
    fetchLista();
  }, []);

  function manipulaInput(e, input) {
    switch (input) {
      case 'nome':
        setNome(e)
        break;
      case 'celular':
        setCelular(e)
        break;
      case 'escritoPor':
        setEscritoPor(e)
        break;
      case 'local':
        setLocal(e)
        break;
    
      default:
        console.log('e :', e)
        break;
    }
  }

  async function cadastrarPessoa(e) {
    e.preventDefault();

    try {      
      axios.post('http://localhost:3333/cadastro', {
        nome: 'Teste12345 Gabriel',
        celular: '11 98601-5416',
        escritopor: 'Gabriel',
        local: 'Santo André'
      })
      .then(function (response) {
        fetchLista();
      })
      .catch(function (error) {
        console.log(error);
      });


      // TODO: atualizar estado com objeto do usuario logado {id, nome, avatar, etc}.
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Paper>
      <form onSubmit={cadastrarPessoa}>
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
      <Tabela pessoas={lista}/>
  </Paper>
  )
} 

export default Pessoas;