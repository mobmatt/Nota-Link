import React, { useState, useRef } from 'react';
import { useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import '../styles/Upload.css';
import EthCrypto from 'eth-crypto';



const Upload = ({ Web3Button }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
    console.log('Modal should open');
    setIsSigning(true); // Show the "Sign" button when files are uploaded
    onOpen(); // Open the modal
  };

  const handleSign = async () => {
    setIsSigning(false);
  
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('file', file);
    });
    try {
      

      
      // Handle success message and update state
      toast({
        title: 'Files signed and uploaded',
        description: `${selectedFiles.length} files signed and uploaded successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
      
      setSelectedFiles([]);
      onClose(); // Close the modal
    } catch (error) {
      // Handle error
      console.error('Error signing and uploading files:', error);
    }
  };
  const handleChooseFile = () => {
    fileInputRef.current.click(); // Trigger the click event on the file input element
  };

  
const identity = EthCrypto.createIdentity();
> {
   address: '',
   privateKey: '',
   publicKey: ''
} 

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


      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag and drop files here
      </div>
      <Button colorScheme='blackAlpha' variant='solid'className="choose-file-button" onClick={handleChooseFile}>
        Choose File
      </Button>
      
      <Button colorScheme='cyan' variant='solid' className="upload-button" onClick={handleUpload}>
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
