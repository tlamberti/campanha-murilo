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
    idPessoa,
    editaPessoa,
    cancelEdit,
    user,
    setUser,
    exibeFormulario,
    handleExibeFormulario,
    setSucesso,
    sucesso,
    open,
    openDuplicidade,
    cadastrarPessoa,
    handleDialog,
    handleDuplicidade,
    alertaTitulo,
    alertaDescricao
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
            {exibeFormulario && <Formulario cancelEdit={cancelEdit} idPessoa={idPessoa} />}
            {openDuplicidade && 
              <Alerta 
                open={openDuplicidade} 
                titulo={alertaTitulo}
                descricao={alertaDescricao}
                sim={() => cadastrarPessoa(null, true)} 
                nao={handleDuplicidade} 
              />}
            {open && 
              <Alerta 
                open={open} 
                titulo="Exclusão"
                descricao="Deseja realmente excluir essa pessoa?"
                sim={removePessoa} 
                nao={handleDialog} 
              />}
            <Mensagem 
              texto={sucesso}
              tipo={'success'}
              exibicao={sucesso}
              onChange={setSucesso}
            />
            {isLoading && <CircularProgress />}
            <Tabela 
              user={user} 
              pessoas={lista} 
              handleDialog={handleDialog} 
              isLoading={isLoading}
              editaPessoa={editaPessoa}
            />
          </>
        : <Login onClick={requestLogin} />
      }
    </div>
  )
} 

export default Pessoas;