import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

import ContextProvider from './context';
import Rotas from './rotas';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const firebaseDatabase= firebaseApp.database();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d2e63',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider 
        firebaseLogin={firebaseAppAuth}
        firebaseDatabase={firebaseDatabase}>
        <Rotas />
      </ContextProvider>
    </ThemeProvider>
  );
}


export default App;
