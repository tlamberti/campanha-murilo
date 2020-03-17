import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios'; 

export const Context = createContext();

const ContextProvider = props => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState("");
  
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  
  const [ lista, setLista ] = useState();

  // Cadastro de novas pessoas
  const [user, setUser] = useState(false);
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [escritoPor, setEscritoPor] = useState('');
  const [local, setLocal] = useState('');
  
  const firebaseAuth = props.firebaseLogin;

  function onAuthStateChange(callback) {
    return firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        callback({ loggedIn: true, email: user.email });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  function login(username, password) {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithEmailAndPassword(username, password)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }

  function logout() {
    firebaseAuth.signOut();
  }

  const requestLogin = useCallback((username, password) => {
    login(username, password).catch(error => setError(error.code));
  }, []);

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  async function fetchLista() {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3333/');
      setLista(response.data);
    }
    catch(err) {
      console.error('erro:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function cadastrarPessoa(e) {
    e.preventDefault();

    try {      
      axios.post('http://localhost:3333/cadastro', {
        nome: nome,
        celular: celular,
        escritopor: escritoPor,
        local: local
      })
      .then(function (response) {
        fetchLista();
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.error(error)
    }
  }

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
    
  return (
    <Context.Provider
    value={{
      error,
      isLoading,
      username,
      password,
      lista,
      user,
      nome,
      celular,
      escritoPor,
      local,

      setError,
      setUsername,
      setPassword,
      onAuthStateChange,
      requestLogin,
      requestLogout,
      setLista,
      fetchLista,
      cadastrarPessoa,
      manipulaInput,
      setUser
    }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;