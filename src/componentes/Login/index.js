import React, { useContext } from 'react'
import { Context } from '../../context';

import { TextField, Button } from '@material-ui/core';

import Mensagem from '../Mensagem/index';

import './style.css';

const Login = ({ onClick}) => {

  const { username, setUsername, password, setPassword, error, setError } = useContext(Context)
  
  function logar(e) {
    e.preventDefault();
    onClick(username, password);
  }

  return (
    <div className="login-container">
      {/* TODO: Titulo e Icone */}
      <header>
        <h1>Campanha - Santo André</h1>
      </header>
      <Mensagem 
        texto='Usuário ou senha Incorreta'
        tipo="error"
        exibicao={error}
        onChange={setError}
      />
      <form className="form" onSubmit={logar}>
        <TextField 
          value={username}
          label="E-mail"
          onChange={e => setUsername(e.target.value)}
          required
        />
        <TextField 
          type="password"
          value={password}
          label="Senha"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button 
          type="submit"
          color="primary" 
          variant="contained"
        >Entrar</Button>
      </form>
    </div>
  );
}

export default Login;