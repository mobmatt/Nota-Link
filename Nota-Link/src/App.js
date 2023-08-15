import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Navbar from './components/Navbar';
import Retrieve from './pages/Retrieve';
import History from './pages/History';
import Signup from './pages/Signup';
import './components/NavbarStyles.css'


function App() {
  return (
    <ChakraProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className='content-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/retrieve" element={<Retrieve />} />
          <Route path="/history" element={<History />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
       
      </div>
    </Router> 
  </ChakraProvider>
  
  );
}

export default App;
