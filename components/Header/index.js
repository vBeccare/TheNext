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
import useHeader from "./hooks/useHeader";

const Header = () => {
  const { isAdmin } = useLocal();
  const {
    handleSignIn,
    handleUsers,
    handleProducts,
    handleHome,
    isProductPath,
    isUserPath,
  } = useHeader();

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
      <Box display="flex" gap="40px" fontSize={16} justifyContent="">
        {isAdmin && (
          <Text
            color="white"
            fontWeight={isUserPath && "bold"}
            borderBottom={isUserPath && "1px"}
            cursor="pointer"
            onClick={handleUsers}
          >
            Usuários
          </Text>
        )}
        <Text
          fontWeight={isProductPath && "bold"}
          borderBottom={isProductPath && "1px"}
          cursor="pointer"
          color="white"
          onClick={handleProducts}
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
