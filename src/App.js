import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import ContextProvider from './context';
import Rotas from './rotas';

const firebaseApp = firebase.initializeApp(firebaseConfig);


const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
}

function App() {
  return (
    <ContextProvider firebaseLogin={firebaseAppAuth}>
      <Rotas />
    </ContextProvider>
  );
}


export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
