import React, { useState, useRef } from 'react';
import {
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import Web3 from 'web3';
import { useAccount } from 'wagmi';
import '../styles/Upload.css'




const Upload = ({ Web3Button }) => {
  const { address } = useAccount();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSigning, setIsSigning] = useState(false);
  const [publicKeyArmored, setPublicKeyArmored] = useState(''); // Store public key here
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log(e);
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    setIsSigning(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSign = () => {
    setIsSigning(false);
  };

  const handleUpload = async () => {
    setIsSigning(true);
    onOpen();

    const forge = require('node-forge');
const pki = forge.pki; // For working with public key infrastructure (asymmetric encryption)
const util = forge.util; // For working with encoding and decoding data


    try {
      for (const file of selectedFiles) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const fileContent = event.target.result;
  
          // Generate an RSA key pair
          const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: 1024 });
          const publicKey = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);
  
          // Encrypt the file content using the public key
          const encryptedData = rsaKeyPair.publicKey.encrypt(forge.util.encodeUtf8(fileContent), 'RSA-OAEP', {
            md: forge.md.sha256.create(),
          });
  
          console.log('Original data:', fileContent);
          console.log('Encrypted data:', encryptedData);

          // Here would be the IPFS upload logic
          // ...

          toast({
            title: 'File encrypted and uploaded to IPFS',
            description: `File ${file.name} encrypted and uploaded successfully.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        };
        reader.readAsArrayBuffer(file);
      }
      setSelectedFiles([]);
      onClose();
    } catch (error) {
      console.error('Error encrypting and uploading to IPFS:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while encrypting and uploading files to IPFS.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="upload-container">
      <input
        className="file-input"
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />

      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        Drag and drop files here
      </div>
      <Button colorScheme="blackAlpha" variant="solid" className="choose-file-button" onClick={handleFileChange}>
        Choose File
      </Button>

      <Button colorScheme="cyan" variant="solid" className="upload-button" onClick={handleUpload}>
        Upload
      </Button>
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
