import { Button, Flex, Image, Input } from "@chakra-ui/react";

import useIndex from "./hooks/useIndex";

const Login = () => {
  const { handleChangeEmail, handleChangePassword, handleLogin } = useIndex();
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        bgColor="gray.300"
        px={32}
        py={16}
        borderRadius={8}
        maxW="900px"
      >
        <Image boxSize="160px" src="/logohome.png" />
        <Input
          placeholder="email@email.com"
          variant="outline"
          mb={4}
          onChange={handleChangeEmail}
        />
        <Input
          placeholder="*******"
          variant="outline"
          mb={12}
          onChange={handleChangePassword}
        />

        <Button colorScheme="teal" mb={2} onClick={handleLogin}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
