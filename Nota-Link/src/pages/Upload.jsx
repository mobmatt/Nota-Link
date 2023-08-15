import React, { useState } from 'react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner, // Import the Spinner component
} from '@chakra-ui/react';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false); // State to track uploading state
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    // Simulate uploading process
    setUploading(true);

    setTimeout(() => {
      // Handle uploading selectedFiles here
      toast({
        title: 'Files uploaded',
        description: `${selectedFiles.length} files uploaded successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setUploading(false);
      setSelectedFiles([]);
      onClose(); // Close the modal after uploading
    }, 2000); // Simulated upload time
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px dashed #ccc', padding: '1rem', margin: '1rem 0' }}
      >
        Drag and drop files here
      </div>
      <Button onClick={onOpen}>Upload</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notarize File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {uploading ? (
              <div style={{ textAlign: 'center' }}>
                <Spinner size="xl" />
                <p>Uploading...</p>
              </div>
            ) : (
              // Your modal content here
              selectedFiles.map((file, index) => (
                <div key={index}>{file.name}</div>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpload}
              disabled={uploading} // Disable the button while uploading
            >
              Sign
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={uploading}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Upload;
