import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pessoas from './paginas/Pessoas';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pessoas} />
      </Switch>
    </BrowserRouter>
  )
}

export default Rotas;