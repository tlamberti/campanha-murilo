import React from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

import ContextProvider from './context';
import Rotas from './rotas';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const firebaseDatabase= firebaseApp.database();

function App() {
  return (
    <ContextProvider 
      firebaseLogin={firebaseAppAuth}
      firebaseDatabase={firebaseDatabase}>
      <Rotas />
    </ContextProvider>
  );
}


export default App;
