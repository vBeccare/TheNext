import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
} from "@chakra-ui/react";

import useLocal from "../../hooks/useLocal";

import Router from "next/router";

const Header = ({ pageActive = "users" }) => {
  const { isAdmin } = useLocal();

  const handleSignIn = () => {
    Router.push("/");
  };
  const handleUsers = () => {
    Router.push("/usuarios");
  };
  const handleProducts = () => {
    Router.push("/produtos");
  };
  const handleHome = () => {
    Router.push("/home");
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
      paddingX="64px"
      h="120px"
      bgColor="teal.500"
    >
      <Image
        boxSize="80px"
        cursor="pointer"
        src="/logoadm.png"
        onClick={handleHome}
      />
      <Box display="flex" gap="40px" justifyContent="" color="white">
        {isAdmin && (
          <Text
            fontWeight={"bold"}
            // fontWeight={pageActive === "users" && "bold"}
            // borderBottom={pageActive === "users" && "1px"}
            cursor="pointer"
            onClick={handleUsers}
          >
            Usuários
          </Text>
        )}
        <Text
          // fontWeight={pageActive === "users" && "bold"}
          // borderBottom={pageActive === "users" && "1px"}
          color="gray.400"
          cursor="not-allowed"
          // onClick={handleProducts}
        >
          Produtos
        </Text>
      </Box>
      <Box>
        <Menu>
          <MenuButton as={Button} padding={2} height="auto" borderRadius="50%">
            <Image boxSize="40px" src="/avatar.png" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSignIn}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
