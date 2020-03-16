import React, { createContext, useState } from 'react';
import axios from 'axios'; 

export const Context = createContext();

const ContextProvider = props => {
  const [ lista, setLista ] = useState();

  // async function submeterLogin(cpf, dtnascimento, history, rota) {
  //   // cpf: "399.567.608-11",
  //   // dtnascimento: "1990-09-29"

  //   try {    
  //     let corpo = {
  //       cpf,
  //       dtnascimento
  //     };
  //     const response = await post(`/auth/login`, corpo);
  //     login(response.token);
  //     irParaNovaRota(history, rota);

  //     // TODO: atualizar estado com objeto do usuario logado {id, nome, avatar, etc}.
  //   } catch (error) {
  //     console.error(error)
  //     setError(error.message);
  //   }
  // }

  async function fetchLista() {
    const api = axios.create({
      baseURL: 'http://localhost:3333/',
    });

    try {
      const response = await api({
        method: 'get',
      });
      setLista(response.data)
    }
    catch(err) {
      console.error('erro:', err);
    }
  }
    
  return (
    <Context.Provider
      value={{
        lista,
        setLista,
        fetchLista
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;