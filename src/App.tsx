import React from 'react';
import './App.css';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {Catalogue} from './components/Catelogue';

const App = () => {


  const theme = extendTheme({
    styles: {
      global: {
        'body': {
          fontSize: '13px',
        },
      },
    },
  })
  return (
    <ChakraProvider theme={theme}>
      <Catalogue/>
    </ChakraProvider>
  );
}

export default App;
