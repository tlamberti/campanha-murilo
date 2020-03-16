import React from 'react';
import ContextProvider from './context'
import Rotas from './rotas';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Rotas />
      </ContextProvider>
    </div>
  );
}

export default App;
