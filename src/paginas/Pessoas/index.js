import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';

import { IconButton, Button, CircularProgress } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

import Login from '../../componentes/Login';
import Tabela from '../../componentes/Tabela';
import Formulario from '../../componentes/Formulario';
import Mensagem from '../../componentes/Mensagem';
import Alerta from '../../componentes/Alerta';

import './style.css';

const Pessoas = () => {
  const { 
    lista, 
    isLoading, 
    onAuthStateChange,
    requestLogin,
    requestLogout,
    removePessoa,
    user,
    setUser,
    exibeFormulario,
    handleExibeFormulario,
    setSucesso,
    sucesso,
    open,
    setOpen
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe(setUser);
    }
  }, []);

  return (
    <div>
      {
        user.loggedIn ?
          <>
            <div className="app-bar">
              <IconButton
                color='primary'
                onClick={handleExibeFormulario}>
                {exibeFormulario ? <Close /> : <Add />}
              </IconButton>
              <Button onClick={requestLogout}>Sair</Button>
            </div>
            {exibeFormulario && <Formulario />}
            {open && <Alerta setOpen={setOpen} open={open} removePessoa={removePessoa} />}
            <Mensagem 
              texto={sucesso}
              tipo="success"
              exibicao={sucesso}
              onChange={setSucesso}
            />
            {isLoading && <CircularProgress />}
            <Tabela user={user} pessoas={lista} removePessoa={removePessoa} isLoading={isLoading}/>
          </>
        : <Login onClick={requestLogin} />
      }
    </div>
  )
} 

export default Pessoas;