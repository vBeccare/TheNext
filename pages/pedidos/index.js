import {
  Button,
  Flex,
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
  ModalFooter,
  Text,
  Input,
} from "@chakra-ui/react";
import { getMoneyMask } from "../../utils/formatters";
import Header from "../../components/Header";

import useOrders from "./hooks/useOrders";

const Usuarios = ({}) => {
  const {
    filteredOrdersList,
    initialChangeRef,
    finalChangeRef,
    isEditOpen,
    onClose,
    orderStatus,
    setOrderStatus,
    isLoading,
    updateOrder,
    handleChange,
    value,
  } = useOrders();

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
          placeholder="Numero pedido"
          maxWidth="400px"
          size="md"
          type="search"
          onChange={handleChange}
          value={value}
        />
      </Flex>
      {filteredOrdersList.length > 0 && (
        <TableContainer
          display="flex"
          overflowY="scroll"
          marginX={32}
          marginTop={16}
        >
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Numero</Th>
                <Th>Data</Th>
                <Th>Valor total</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrdersList.map(
                ({ orderNumber, date, totalValue, status, Acoes }, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{orderNumber}</Td>
                      <Td>{date}</Td>
                      <Td>{getMoneyMask(totalValue, 'R$', 2)}</Td>
                      <Td>{status}</Td>

                      <Td>
                        <Acoes status={status} id={orderNumber} />
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Numero</Th>
                <Th>Data</Th>
                <Th>Valor total</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}

      {!filteredOrdersList.length > 0 && (
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
          <ModalHeader>Alterar status</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Selecione..."
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option>Aguardando pagamento</option>
                <option>Pagamento rejeitado</option>
                <option>Pagamento com sucesso</option>
                <option>Aguardando retirada</option>
                <option>Em transito</option>
                <option>Entregue</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={updateOrder}>
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
