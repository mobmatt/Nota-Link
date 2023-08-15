import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Navbar from './components/Navbar';
import Retrieve from './pages/Retrieve';
import History from './pages/History';
import Signup from './pages/signup';
import Web3Modal from "web3modal";
import './styles/NavbarStyles.css'
const ethers = require("ethers");

const providerOptions = {

}


function App() {

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.web3ModalProvider(web3ModalInstance);
      console.log(web3ModalProvider);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ChakraProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className='content-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload connectWallet={connectWallet}/>} />
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
