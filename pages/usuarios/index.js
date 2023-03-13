import {
  Button,
  Flex,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Header from "../../components/Header";

import useUsuarios from "./hooks/useUsuarios";

const Usuarios = ({}) => {
  const {
    handleChange,
    filteredUsersList,
    value,
    initialChangeRef,
    finalChangeRef,
    initialNewRef,
    finalNewRef,
    isEditOpen,
    isNewOpen,
    setIsNewOpen,
    onClose,
    nameForm,
    emailForm,
    groupForm,
    setNameForm,
    setGroupForm,
  } = useUsuarios();

  return (
    <Flex height="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex
        display="flex"
        justifyContent="space-between"
        marginX={32}
        marginTop={10}
      >
        <Input
          placeholder="Nome"
          maxWidth="400px"
          size="md"
          type="search"
          onChange={handleChange}
          value={value}
        />
        <Button
          rightIcon={<AddIcon />}
          onClick={() => setIsNewOpen(true)}
          colorScheme="green"
        >
          Adicionar usuário
        </Button>
      </Flex>
      {filteredUsersList.length > 0 && (
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
              {filteredUsersList.map(
                ({ id, name, email, status, group, Acoes }) => {
                  return (
                    <Tr>
                      <Td>{name}</Td>
                      <Td>{email} </Td>
                      <Td>{status}</Td>
                      <Td>{group}</Td>
                      <Td>
                        <Acoes
                          name={name}
                          email={email}
                          group={group}
                          status={status}
                          id={id}
                        />
                      </Td>
                    </Tr>
                  );
                }
              )}
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
      )}

      {!filteredUsersList.length > 0 && (
        <Text marginX={32} marginTop={16}>
          Nenhum resultado encontrado
        </Text>
      )}

      <Modal
        initialFocusRef={initialChangeRef}
        finalFocusRef={finalChangeRef}
        isOpen={isEditOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                ref={initialChangeRef}
                value={nameForm}
                placeholder="Nome"
                onChange={(e) => setNameForm(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} pointerEvents="none">
              <FormLabel>E-mail</FormLabel>
              <Input
                backgroundColor="gray.200"
                value={emailForm}
                placeholder="E-mail"
                isReadOnly
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Grupo</FormLabel>
              <Select
                placeholder="Selecione..."
                value={groupForm}
                onChange={(e) => setGroupForm(e.target.value)}
              >
                <option>Administrador</option>
                <option>Estoquista</option>
              </Select>
            </FormControl>

            {/* criar onChange para senhas e comparativo entre elas */}
            <FormControl mt={4} isInvalid>
              <FormLabel>Senha</FormLabel>
              <Input placeholder="******" />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid>
              <FormLabel>Confirmar senha</FormLabel>
              <Input placeholder="******" />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialNewRef}
        finalFocusRef={finalNewRef}
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                ref={initialNewRef}
                placeholder="Nome"
                onChange={(e) => setNameForm(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isInvalid>
              <FormLabel>CPF</FormLabel>
              <Input placeholder="CPF" />
              <FormErrorMessage>CPF inválido</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>E-mail</FormLabel>
              <Input placeholder="E-mail" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Grupo</FormLabel>
              <Select
                placeholder="Selecione..."
                onChange={(e) => setGroupForm(e.target.value)}
              >
                <option>Administrador</option>
                <option>Estoquista</option>
              </Select>
            </FormControl>

            {/* criar onChange para senhas e comparativo entre elas */}
            <FormControl mt={4} isInvalid>
              <FormLabel>Senha</FormLabel>
              <Input placeholder="******" />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid>
              <FormLabel>Confirmar senha</FormLabel>
              <Input placeholder="******" />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Salvar
            </Button>
            <Button onClick={() => setIsNewOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Usuarios;
