import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact element={Home} />
            <Route path="/upload" element={Upload} />
          </Switch>
        </div>
      </Router> 
    </ChakraProvider>
  );
}

export default App;
