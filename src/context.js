import React, { createContext, useState, useCallback, useEffect } from 'react';

import { mascaraTelefone } from './util/ferramentas';

export const Context = createContext();

const ContextProvider = props => {
  const [ open, setOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ sucesso, setSucesso ] = useState('');
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const [ lista, setLista ] = useState();

  // Cadastro de novas pessoas
  const [user, setUser] = useState(false);
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [escritoPor, setEscritoPor] = useState('');
  const [local, setLocal] = useState('');
  const [exibeFormulario, setExibeFormulario] = useState(false);

  
  const firebaseAuth = props.firebaseLogin;
  const firebaseDatabase = props.firebaseDatabase;

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

  useEffect(() => {
    if(user.loggedIn) {
      const unsubscribe = firebaseDatabase.ref('pessoas').on('value', function(snapshot){
        const obj = Object.values(snapshot.val())
        setLista(obj);
      });

      return () => unsubscribe();
    }
  }, [user.loggedIn])

  function cadastrarPessoa(e) {
    e.preventDefault();
 
    try {  
      var data = {
        nome: nome,
        celular: celular,
        escritopor: user.email,
        local: local
      };
      firebaseDatabase.ref().child('pessoas').push(data);

      setNome('');
      setCelular('');
      setLocal('');
      setSucesso('Cadastrado com Sucesso!');
    } catch (error) {
      console.error(error)
    }
  }

  function removePessoa(id, dialog) {
    firebaseDatabase.collection('pessoas').doc(id).delete()
      .then(() => {
        setSucesso('Removido com Sucesso!');
      });
  }

  function handleExibeFormulario() {
    setExibeFormulario(!exibeFormulario);
  }

  function manipulaInput(e, input) {
    switch (input) {
      case 'nome':
        setNome(e)
        break;
      case 'celular':
        setCelular(mascaraTelefone(e))
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
      open,
      isLoading,
      sucesso,
      exibeFormulario,
      username,
      password,
      lista,
      user,
      nome,
      celular,
      escritoPor,
      local,

      setError,
      setOpen,
      setSucesso,
      setUsername,
      setPassword,
      onAuthStateChange,
      requestLogin,
      requestLogout,
      setLista,
      cadastrarPessoa,
      removePessoa,
      manipulaInput,
      setUser,
      handleExibeFormulario
    }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;