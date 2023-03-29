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
  FormErrorMessage,
  ModalFooter,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Header from "../../components/Header";

import useProdutos from "./hooks/useProdutos";
import usePagination from "./hooks/usePagination";
import useLocal from "../../hooks/useLocal";

import ReactPaginate from "react-paginate";

import styles from "./style.module.css";
import EditModal from "./components/EditModal";
import { getMoneyMask } from "../../utils/formatters";
import useFormatters from "./hooks/useFormatters";

const Usuarios = () => {
  const {
    handleChange,
    createNewProduct,
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
    setNameForm,
    isButtonDisabled,

    nameValidator,

    isLoading,
    updateUser,

    setPriceForm,
    priceForm,
    setQtdForm,
    qtdForm,
    setDescricao,
    descricao,
  } = useProdutos();

  const { onChangePage } = usePagination();

  const { handleInputNumberChange } = useFormatters({
    setPriceForm,
  });

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
          onClick={() => {
            setPriceForm();
            setIsNewOpen(true);
          }}
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
                (
                  {
                    id,
                    name,
                    quantidade,
                    valor,
                    status,
                    descricao,
                    avaliacao,
                    imagens,
                    Acoes,
                  },
                  idx
                ) => {
                  return (
                    <Tr key={idx}>
                      <Td>{id}</Td>
                      <Td maxWidth={80} overflowX="scroll">
                        {name}
                      </Td>
                      <Td>{quantidade} </Td>
                      <Td>{getMoneyMask(valor, "R$", 2)}</Td>
                      <Td>{status}</Td>
                      <Td>
                        <Acoes
                          id={id}
                          name={name}
                          quantidade={quantidade}
                          valor={valor}
                          status={status}
                          descricao={descricao}
                          avaliacao={avaliacao}
                          imagens={imagens}
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
          pageCount={1}
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
        updateProduct={updateUser}
        isAdmin={isAdmin}
        handleInputNumberChange={handleInputNumberChange}
        priceForm={priceForm}
        setPriceForm={setPriceForm}
        qtdForm={qtdForm}
        setQtdForm={setQtdForm}
        setDescricao={setDescricao}
        descricao={descricao}
      />

      <Modal
        initialFocusRef={initialNewRef}
        finalFocusRef={finalNewRef}
        isOpen={isNewOpen}
        onClose={() => {
          setIsNewOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo produto</ModalHeader>
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

            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="Máximo 2000 caracteres"
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Preço</FormLabel>
              <Input
                value={priceForm}
                placeholder="R$ 0,00"
                onChange={(e) => handleInputNumberChange(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantidade</FormLabel>
              <Input
                placeholder="0"
                onChange={(e) => setQtdForm(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={createNewProduct}
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
