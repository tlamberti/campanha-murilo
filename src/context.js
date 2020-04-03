import React, { createContext, useState, useCallback, useEffect } from 'react';
import { mascaraTelefone } from './util/ferramentas';

export const Context = createContext();
let develop = false;
let collection = develop ? 'develop-pessoas' : 'pessoas';


const ContextProvider = props => {
  const [ open, setOpen ] = useState(false);
  const [ openDuplicidade, setOpenDuplicidade ] = useState(false);
  const [ alertaTitulo, setAlertaTitulo ] = useState(false);
  const [ alertaDescricao, setAlertaDescricao ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ sucesso, setSucesso ] = useState('');
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const [ lista, setLista ] = useState();
  const [ listaPessoasCompleta, setListaPessoasCompleta ] = useState();

  // Cadastro de novas pessoas
  const [ user, setUser ] = useState(false);
  const [ idPessoa, setIdPessoa ] = useState(null);
  const [ idAtual, setIdAtual ] = useState();
  const [ nome, setNome ] = useState('');
  const [ celular, setCelular ] = useState('');
  const [ escritoPor, setEscritoPor ] = useState('');
  const [ vinculo, setVinculo ] = useState('');
  const [ exibeFormulario, setExibeFormulario ] = useState(false);

  
  const firebaseAuth = props.firebaseLogin;
  const firebaseDatabase = props.firebaseDatabase;

  function onAuthStateChange(callback) {
    return firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        callback({ loggedIn: true, email: user.email, uid: user.uid });
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
      
      const unsubscribe = firebaseDatabase.ref(collection).on('value', snapshot => {
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
        
        //Filtra exibição
        if(user.email !== 'adm@campanhamurilo.com') {
            let filtroPessoas =  arrPessoasComId.filter(pessoa => {
              if(pessoa.idusuario === user.uid)
                return pessoa;
            })
            return setLista(filtroPessoas);
          }

        setListaPessoasCompleta(arrPessoasComId)
        setLista(arrPessoasComId || []);
      });

      return () => unsubscribe();
    }
  }, [user.loggedIn])

  function normalizarTexto(texto) {
    let textoNormalizado = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return textoNormalizado;
  }

  function cadastrarPessoa(e, cadastrar) {
    let mensagens = [];

    if(e) e.preventDefault();

    const semDuplicidade = listaPessoasCompleta.filter(pessoa => {
      let pessoaNormalizada = normalizarTexto(pessoa.nome).split(' ');
      let nomeNormalizado = normalizarTexto(nome).split(' ');
      const verificaNomeSobrenome = pessoaNormalizada[0].includes(nomeNormalizado[0]) && (pessoaNormalizada[1] && pessoaNormalizada[1].includes(nomeNormalizado[1]));

      if (pessoa.celular === celular) {
        mensagens.push('celular');
        return pessoa;
      } else if (verificaNomeSobrenome) {
        mensagens.push('nome');
        return pessoa;
      } 
    });

    if(!cadastrar && semDuplicidade.length) {
      let listaNomes = semDuplicidade.map(pessoa => pessoa.nome)
      let joinMensagens = mensagens.join();
      let msg = 'Esse número de Celular e Nome consta no(s) seguinte(s) cadastros(s)'
      setOpenDuplicidade(true);
      setAlertaTitulo('Duplicidade de Registro');
      setAlertaDescricao(`
        ${joinMensagens.includes('celular') && joinMensagens.includes('nome') ? 
          msg : joinMensagens.includes('celular') ? 
          'Esse Número de Celular já consta no(s) seguinte(s) cadastro(s)' : 
          'Esse Nome já consta no(s) seguinte(s) cadastro(s)'}: 
        ${listaNomes.join(', ')}, deseja continuar?
      `);
      return;
    }

    if(!semDuplicidade.length || cadastrar) {
      try {  
        var data = {
          nome: nome,
          celular: celular,
          escritopor: user.email,
          vinculo: vinculo,
          idusuario: user.uid
        };
  
        if(idPessoa) {
          firebaseDatabase.ref(`${collection}/${idPessoa}`)
          .update(data);
          setExibeFormulario(false);
        } else {
          firebaseDatabase.ref().child(collection)
          .push(data);
        }
  
      } catch (error) {
        console.error(error)
      } finally {
        setSucesso(idPessoa ? 'Alterado com Sucesso!' : 'Cadastrado com Sucesso!');
        setNome('');
        setCelular('');
        setVinculo('');
        setIdPessoa(null);
        setOpenDuplicidade(false);
      }
    }
  }

  function removePessoa() {
    var updates = {};
    updates[`/${collection}/` + idAtual] = null;

    setOpen(false);
    firebaseDatabase
      .ref()
      .update(updates)
      .then(() => window.scrollTo(0,0))
      .then(() => {
        setSucesso('Removido com Sucesso!');
      }
    );
  }

  function editaPessoa(pessoa) {
    setExibeFormulario(true);
    window.scrollTo(0,0);
    setIdPessoa(pessoa.id);
    setNome(pessoa.nome);
    setCelular(pessoa.celular);
    setVinculo(pessoa.vinculo);
  }

  function cancelEdit() {
    setIdPessoa('');
    setNome('');
    setCelular('');
    setVinculo('');
    setExibeFormulario(false);
    setError(false);
  }

  function handleExibeFormulario() {
    setExibeFormulario(!exibeFormulario);
    setNome('');
    setCelular('');
    setVinculo('');
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
    
  const handleDuplicidade = (condition) => {
    setOpenDuplicidade(condition);
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
      openDuplicidade,
      isLoading,
      sucesso,
      exibeFormulario,
      idPessoa,
      username,
      password,
      lista,
      user,
      nome,
      celular,
      escritoPor,
      vinculo,
      alertaTitulo,
      alertaDescricao,

      setError,
      setOpen,
      setSucesso,
      setAlertaTitulo,
      setAlertaDescricao,
      setUsername,
      setPassword,
      onAuthStateChange,
      requestLogin,
      requestLogout,
      setLista,
      cadastrarPessoa,
      editaPessoa,
      cancelEdit,
      removePessoa,
      manipulaInput,
      setUser,
      handleExibeFormulario,
      handleDialog,
      handleDuplicidade
    }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;