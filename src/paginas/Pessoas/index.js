import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';

import { Paper, IconButton, Button } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

import Login from '../../componentes/Login';
import Tabela from '../../componentes/Tabela';
import Formulario from '../../componentes/Formulario';
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
    <Paper>
      {
        user.loggedIn ?
          <>
            <Button onClick={requestLogout}>Sair</Button>
            <IconButton onClick={handleShow}>
              {show ? <Close /> : <Add color='primary' />}
            </IconButton>

            {show &&
              <>
                <Formulario />
              </>
            }
            <Tabela pessoas={lista} isLoading={isLoading}/>
          </>
        : <Login onClick={requestLogin} />
      }
    </Paper>
  )
} 

export default Pessoas;