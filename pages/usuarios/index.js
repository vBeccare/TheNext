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
} from "@chakra-ui/react";
import Header from "../../components/Header";

import useUsuarios from "./hooks/useUsuarios";

const Usuarios = ({}) => {
  const { handleChange, filteredUsersList, value } = useUsuarios();

  return (
    <Flex height="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex maxWidth="400px" display="flex">
        <Input
          placeholder="Nome"
          size="md"
          type="search"
          onChange={handleChange}
          value={value}
        />
      </Flex>
      <TableContainer display="flex" marginX={32} marginTop={32}>
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
    </Flex>
  );
};

export default Usuarios;
