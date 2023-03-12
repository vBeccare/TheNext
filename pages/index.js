import { Button, Flex, Heading, Input } from "@chakra-ui/react";

import Router from "next/router";

const Login = () => {
  const handleSignUp = () => {
    Router.push("/usuarios");
  };
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        bgColor="gray.300"
        px={32}
        py={16}
        borderRadius={8}
        maxW="900px"
      >
        <Heading color="teal.400" textAlign="center" mb={8}>
          The Next
        </Heading>
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
