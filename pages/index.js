import { Button, Flex, Heading, Image, Input } from "@chakra-ui/react";

import Router from "next/router";

const Login = () => {
  const handleSignUp = () => {
    Router.push("/usuarios");
  };
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
        <Input placeholder="email@email.com" variant="outline" mb={4} />
        <Input placeholder="*******" variant="outline" mb={12} />


        <Button colorScheme="teal" mb={2} onClick={() => handleSignUp()}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
