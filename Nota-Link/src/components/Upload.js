import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const Upload = () => {
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
      <button onClick={handleUpload}>Upload</button>
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
