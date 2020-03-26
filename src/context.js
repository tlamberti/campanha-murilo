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
  const [ idAtual, setIdAtual ] = useState();
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [escritoPor, setEscritoPor] = useState('');
  const [vinculo, setVinculo] = useState('');
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
      const unsubscribe = firebaseDatabase.ref('pessoas').on('value', snapshot => {
        let pessoas = snapshot && snapshot.val();
        if(!pessoas) {
          setLista([]);
          return;
        }

        const arrPessoasComId = Object.entries(pessoas).map(f => {
          let objPessoa = f[1];
          objPessoa.id = f[0]
          return objPessoa
        })

        setLista(arrPessoasComId || []);
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
        vinculo: vinculo
      };
      firebaseDatabase.ref().child('pessoas').push(data);

      setNome('');
      setCelular('');
      setVinculo('');
      setSucesso('Cadastrado com Sucesso!');
    } catch (error) {
      console.error(error)
    }
  }

  function removePessoa() {
    var updates = {};
    updates['/pessoas/' + idAtual] = null;

    setOpen(false);
    firebaseDatabase
      .ref()
      .update(updates)
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
      case 'vinculo':
        setVinculo(e)
        break;
    
      default:
        console.log('e :', e)
        break;
    }
  }
    
  const handleDialog = (condition, id) => {
    setOpen(condition);
    setIdAtual(id);
  };

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
      vinculo,

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
      handleExibeFormulario,
      handleDialog
    }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;