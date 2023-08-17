import React, { useState, useRef } from 'react';
import { useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import '../styles/Upload.css';

const Upload = ({ connectWallet }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(null);
  const [isSigning, setIsSigning] = useState(false); // State for showing the "Sign" button
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef(null); 

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    setIsSigning(true); // Show the "Sign" button when files are dropped
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    setIsSigning(true); // Show the "Sign" button when files are uploaded
    onOpen(); // Open the modal
  };

  const handleSign = () => {
    // Handle signing the files and showing a success message
    setIsSigning(false); // Reset the signing state
    toast({
      title: 'Files signed and uploaded',
      description: `${selectedFiles.length} files signed and uploaded successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setSelectedFiles([]);
    onClose(); // Close the modal
  };

  const handleChooseFile = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  const handleWalletConnect = async () => {
    try {
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
     ref={fileInputRef} // Assign the ref to the file input
     type="file"
     style={{ display: 'none' }}
     multiple
     onChange={handleFileChange}
      />

<Button colorScheme='teal' variant='solid'className="choose-file-button" onClick={handleChooseFile}>
        Choose File
      </Button>
      
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

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notarize Files</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isSigning ? (
              <p>Click sign to notarize selected files</p>
            ) : (
              <p>Drag and drop files or use the upload button.</p>
            )}
          </ModalBody>
          <ModalFooter>
            {isSigning ? (
              <>
                <Button colorScheme="blue" mr={3} onClick={handleSign}>
                  Sign
                </Button>
                <Button colorScheme="gray" onClick={onClose}>
                  Close
                </Button>
              </>
            ) : (
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Upload;
