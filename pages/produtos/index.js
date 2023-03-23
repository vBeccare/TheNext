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
  Spinner,
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
import InputMask from "react-input-mask";
import { AddIcon } from "@chakra-ui/icons";
import Header from "../../components/Header";

import useProdutos from "./hooks/useProdutos";
import usePagination from "./hooks/usePagination";
import useLocal from "../../hooks/useLocal";

import Router from "next/router";
import ReactPaginate from "react-paginate";

import styles from "./style.module.css";
import EditModal from "./components/EditModal";

const Usuarios = () => {
  const {
    handleChange,
    createNewUser,
    filteredProductList,
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
    groupForm,
    setNameForm,
    setGroupForm,
    setEmailForm,
    isButtonDisabled,

    cpfValid,
    isCpfValid,
    setCpfForm,

    setConfirmPassword,
    setPassword,
    hasSamePasswords,

    nameValidator,
    emailValidator,

    isLoading,
    updateUser,
  } = useProdutos();

  const { onChangePage } = usePagination();

  const { isAdmin } = useLocal();

  if (isLoading) {
    return (
      <Flex
        height="100vh"
        marginBottom={16}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Header />
        <Spinner
          marginY="auto"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Flex
      height="100vh"
      marginBottom={16}
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Flex
        display="flex"
        justifyContent="space-between"
        marginX={32}
        marginTop={10}
      >
        <Input
          placeholder="Nome produto"
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
          Adicionar produto
        </Button>
      </Flex>
      {filteredProductList.length > 0 && (
        <TableContainer
          display="flex"
          overflowY="scroll"
          marginX={32}
          marginTop={16}
        >
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Nome</Th>
                <Th>Quantidade</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProductList.map(
                ({ id, name, email, status, group, cpf, Acoes }, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{idx}</Td>
                      <Td maxWidth={80} overflowX="scroll">
                        Samsung S23 ULTRA com camera 23 adhu asdhus ashduasd
                        sahdusah sahduash ahsudash{" "}
                      </Td>
                      <Td>quantidade </Td>
                      <Td>valor</Td>
                      <Td>{status}</Td>
                      <Td>
                        <Acoes
                          name={name}
                          email={email}
                          group={group}
                          status={status}
                          cpf={cpf}
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
                <Th>Código</Th>
                <Th>Nome</Th>
                <Th>Quantidade</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
      {filteredProductList.length > 0 && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próxima"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={styles.active}
          containerClassName={styles.pagination}
          subContainerClassName={"pages pagination"}
          initialPage={0}
          pageCount={25}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onChangePage}
        />
      )}

      {!filteredProductList.length > 0 && (
        <Text marginX={32} marginTop={16}>
          Nenhum resultado encontrado
        </Text>
      )}

      <EditModal
        initialChangeRef={initialChangeRef}
        finalChangeRef={finalChangeRef}
        isEditOpen={isEditOpen}
        onClose={onClose}
        nameForm={nameForm}
        setNameForm={setNameForm}
        // descriptionForm={descriptionForm}
        // setDescriptionForm={setDescriptionForm}
        // priceForm={priceForm}
        // setPriceForm={setPriceForm}
        // qtdForm={qtdForm}
        // setQtdForm={setQtdForm}
        updateProduct={updateUser}
        isAdmin={isAdmin}
      />

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
            <FormControl isInvalid={!nameValidator}>
              <FormLabel>Nome</FormLabel>
              <Input
                ref={initialNewRef}
                placeholder="Nome"
                onChange={(e) => setNameForm(e.target.value)}
              />
              <FormErrorMessage>Minimo 4 caracteres</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!cpfValid}>
              <FormLabel>CPF</FormLabel>
              <Input
                as={InputMask}
                mask="***.***.***-**"
                placeholder="CPF"
                onChange={(e) => {
                  isCpfValid(e.target.value);
                  setCpfForm(e.target.value);
                }}
              />
              <FormErrorMessage>CPF inválido</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!emailValidator}>
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder="E-mail"
                onChange={(e) => setEmailForm(e.target.value)}
              />
              <FormErrorMessage>Email inválido</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!groupForm}>
              <FormLabel>Grupo</FormLabel>
              <Select
                placeholder="Selecione..."
                onChange={(e) => setGroupForm(e.target.value)}
              >
                <option>Administrador</option>
                <option>Estoquista</option>
              </Select>
              <FormErrorMessage>Selecione um item</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!hasSamePasswords}>
              <FormLabel>Senha</FormLabel>
              <Input
                placeholder="******"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!hasSamePasswords}>
              <FormLabel>Confirmar senha</FormLabel>
              <Input
                placeholder="******"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>As senhas não são iguais</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={createNewUser}
              isDisabled={isButtonDisabled}
            >
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
