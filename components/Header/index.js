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
  
  import Router from "next/router";
  
  const Header = ({ pageActive = "users" }) => {
    const handleSignIn = () => {
      Router.push("/");
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
        <Image boxSize="80px" src="/avatar.png" />
        <Box display="flex" gap="40px" justifyContent="" color="white">
          <Text
            fontWeight={pageActive === "users" && "bold"}
            borderBottom={pageActive === "users" && "1px"}
          >
            Usuários
          </Text>
          <Text
            fontWeight={pageActive === "product" && "bold"}
            borderBottom={pageActive === "product" && "1px"}
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