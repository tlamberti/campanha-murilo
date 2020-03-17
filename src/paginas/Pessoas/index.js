import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';

import { Paper, IconButton, Button, CircularProgress } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

import Login from '../../componentes/Login';
import Tabela from '../../componentes/Tabela';
import Formulario from '../../componentes/Formulario';

import './style.css';

const Pessoas = () => {
  const { 
    fetchLista, 
    lista, 
    isLoading, 
    onAuthStateChange,
    requestLogin,
    requestLogout,
    user,
    setUser
  } = useContext(Context);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe(setUser);
    }
  }, []);

  useEffect(() => {
    console.log(user);
    if(user.loggedIn)
      fetchLista();
  }, [user.loggedIn])


  function handleShow() {
    setShow(!show);
  }

  return (
    <div>
      {isLoading && <CircularProgress />}
      {
        user.loggedIn ?
          <>
            <div class="app-bar">
              <Button
                variant="contained"
                color='primary'
                onClick={handleShow}
                startIcon={show ? <Close /> : <Add />}
              >
                {show ? 'Fechar' : 'Novo Cadastro'}
              </Button>
              <Button onClick={requestLogout}>Sair</Button>
            </div>
            {show &&
              <>
                <Formulario />
              </>
            }
            <Tabela pessoas={lista} isLoading={isLoading}/>
          </>
        : <Login onClick={requestLogin} />
      }
    </div>
  )
} 

export default Pessoas;