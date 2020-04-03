import React, { useEffect } from 'react';

import Alert from '@material-ui/lab/Alert';

import './style.css';

const Mensagem = ({ texto, tipo, exibicao, onChange }) => {


  useEffect(() => {
    const exibition = setTimeout(() => {
      onChange(false)
    }, 2000);

    return () => {
      clearTimeout(exibition)
    }
  }, [exibicao])

  return (
    <Alert
      className={exibicao ? 'mostrar' : 'esconder'} 
      severity={tipo}
    >
			{texto}
    </Alert>
  );
};

export default Mensagem;