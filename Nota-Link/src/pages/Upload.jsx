import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import "../styles/Upload.css";

const Upload = ({ connectWallet }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(null); // New state variable
  const toast = useToast();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    // Handle uploading selectedFiles here
    toast({
      title: 'Files uploaded',
      description: `${selectedFiles.length} files uploaded successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setSelectedFiles([]);
  };

  const handleWalletConnect = async () => {
    try {
      // Call the connectWallet function and store the wallet address
      const walletAddress = await connectWallet();
      setConnectedWalletAddress(walletAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload-container">
      <input
        className="file-input"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag and drop files here
      </div>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      <div className="selected-files">
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
      <div className="connect-wallet-container">
        <h1>Connect Wallet</h1>
        {connectedWalletAddress ? (
          <p>Connected Wallet: {connectedWalletAddress}</p>
        ) : (
          <button className="connect-wallet-button" onClick={handleWalletConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
