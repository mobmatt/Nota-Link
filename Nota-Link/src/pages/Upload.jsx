import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import "../styles/Upload.css";

const Upload = ({connectWallet}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Upload;