import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        bgColor="gray.600"
        px={32}
				py={16}
        borderRadius={8}
				maxW="900px"
      >
        <Heading color="teal.400" textAlign="center" mb={8}>
          The Next
        </Heading>
        <Input placeholder="email@email.com" variant="filled" mb={4} />
        <Input placeholder="*******" variant="filled" mb={12}  />
        <Button colorScheme="teal" mb={2}>
          Entrar
        </Button>
        <Button variant="ghost" colorScheme="teal" mb={6}>
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
