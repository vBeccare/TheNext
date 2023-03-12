import {
  Button,
  Flex,
  Heading,
  Input,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons"
import Header from "../../components/Header";

import useUsuarios from "./hooks/useUsuarios";

const Usuarios = ({ }) => {
  const { handleChange, filteredUsersList, value, initialRef, finalRef, isOpen, onClose } = useUsuarios();

  return (
    <Flex height="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex display="flex" justifyContent="space-between" marginX={32} marginTop={10}>
        <Input
          placeholder="Nome"
          maxWidth="400px"
          size="md"
          type="search"
          onChange={handleChange}
          value={value}
        />
        <Button rightIcon={<AddIcon />} colorScheme="green">Adicionar usuário</Button>
      </Flex>
      <TableContainer display="flex" marginX={32} marginTop={16}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Grupo</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsersList.map(({ name, email, status, grupo, Acoes }) => {
              return (
                <Tr>
                  <Td>{name}</Td>
                  <Td>{email} </Td>
                  <Td>{status}</Td>
                  <Td>{grupo}</Td>
                  <Td>
                    <Acoes />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Grupo</Th>
              <Th>Ações</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Modal

        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input ref={initialRef} placeholder='Nome' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>E-mail</FormLabel>
              <Input placeholder='E-mail' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Grupo</FormLabel>
              <Input placeholder='Grupo' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input placeholder='******' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirmar senha</FormLabel>
              <Input placeholder='******' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </Flex>
  );
};

export default Usuarios;
