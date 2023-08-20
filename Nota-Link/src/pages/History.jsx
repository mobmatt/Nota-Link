import React,{useState}from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Box, Heading, Text, Button } from '@chakra-ui/react';
import '../styles/History.css'; 
import '../components/SideBar';



function History() {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Set the total number of pages
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };


  return (
    <div className='history-container' mt="100px"> 
      
    <Card>
      <CardHeader>
        <Heading size='md'>History</Heading>
      </CardHeader>

      <CardBody>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Document History</TableCaption>
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th>Signatures</Th>
                <Th isNumeric>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>File Name</Th>
                <Th>Signature</Th>
                <Th isNumeric>Date</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Box mt="4" display="flex" justifyContent="center">
            <Text>Page {currentPage} of {totalPages}</Text>
          </Box>
          <Box mt="2" display="flex" justifyContent="center">
            <Button
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              ml="2"
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
      </CardBody>
    </Card>
    </div>
  );
}

export default History;
