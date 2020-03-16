import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context';

import { Paper, IconButton } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';



import Tabela from '../../componentes/Tabela';
import Formulario from '../../componentes/Formulario'
const Pessoas = () => {

  const { fetchLista, lista, setLista } = useContext(Context);
  const [show, setShow] = useState(false);
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

  function handleShow() {
    setShow(!show);
  }
  return (
    <Paper>
      <IconButton onClick={handleShow}>
        {show ? <Close /> : <Add color='primary' />}
      </IconButton>

      {show &&
        <>
          <Formulario 
            nome={nome} 
            celular={celular} 
            escritoPor={escritoPor} 
            local={local} 
            manipulaInput={manipulaInput} 
            cadastrarPessoa={cadastrarPessoa} 
          />
        </>
      }
      <Tabela pessoas={lista}/>
  </Paper>
  )
} 

export default Pessoas;