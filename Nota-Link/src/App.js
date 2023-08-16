import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Navbar from './components/Navbar';
import History from './pages/History';
import Signup from './pages/signup';
import './styles/NavbarStyles.css'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, goerli } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react';

const chains = [arbitrum, mainnet, polygon, goerli]
const projectId = '899f35581c3996b09fd48d91fe0be5e1'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)




function App() {

  
  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>    <Router>
      <div className="App">
        <Navbar />
        <div className='content-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload Web3Button={Web3Button}/>} />
          <Route path="/history" element={<History />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
       
      </div>
    </Router> 
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </ChakraProvider>
  
  );
}

export default App;
