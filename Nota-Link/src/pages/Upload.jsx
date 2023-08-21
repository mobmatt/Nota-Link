import React, { useState } from 'react';
import { useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import '../styles/Upload.css';
import { Web3Modal } from '@web3modal/react';
import { useWeb3Modal } from '@web3modal/react';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';
import { useAccount } from 'wagmi';








const Upload = ({ Web3Button }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [publicKey, setPublicKey] = useState('');
  const [isSigning, setIsSigning] = useState(false); // State for showing the "Sign" button
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();


 

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
    headers: {
      authorization: 'Basic ' + btoa('2U7lmm7vA3drtU7B5lgLM46BB2m:45da224ddbdf444a7ba88415425a28ce')
    }
  });

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



  const handleSign =  async () => {

    
    
    // Handle signing the files and showing a success message
    setIsSigning(false); // Reset the signing state
    try {
      // Upload files to IPFS
      const uploadedFiles = await Promise.all(selectedFiles.map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        const ipfsResponse = await ipfs.add(fileBuffer);
        return ipfsResponse.path;
      }));
      
      console.log('Uploaded Files:', uploadedFiles);
      
      const symmetricKey = CryptoJS.lib.WordArray.random(32); // 256-bit key

      // Encrypt each CID using the symmetric key
      const encryptedCIDs = uploadedFiles.map((cid) => {
        const encryptedCID = encryptString(cid, symmetricKey);
        return encryptedCID;
      });
      
      console.log('Encrypted CIDs:', encryptedCIDs);

      // Show success message
      toast({
        title: 'CIDs encrypted and uploaded to IPFS',
        description: `${uploadedFiles.length} CIDs encrypted and uploaded successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      
 

  
      // Clear selected files and close modal
      setSelectedFiles([]);
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while uploading files to IPFS.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
   

  const encryptString = (data, key) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Initialization vector for encryption
    const encryptedData = CryptoJS.AES.encrypt(data, key, { iv });
    return { encryptedData: encryptedData.toString(), iv: iv.toString() };
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
      <div>
        <Web3Button />
      </div>
      <div>{address}</div>
     

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

