import Router from './routes/Router';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalState from './contexts/GlobalState';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle `
::-webkit-scrollbar {
  height: .5rem;
  width: .5rem;
}
::-webkit-scrollbar-thumb {
  background: #797978;
  border-radius: 0;
}
::-webkit-scrollbar-track {
  background: #f2efe9;
}
`;

function App() {


  return (
    <ChakraProvider>
      <GlobalState>
        <GlobalStyles />
        <Router />

      </GlobalState>
    </ChakraProvider>
  );
}

export default App;
