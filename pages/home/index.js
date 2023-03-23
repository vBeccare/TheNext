import { Flex, Text } from "@chakra-ui/react";

import useHome from "./hooks/useHome";

import Header from "../../components/Header";

const Home = () => {
  const { userLoggedGroup, userLoggedName } = useHome();
  return (
    <Flex
      height="100vh"
      marginBottom={16}
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Flex marginY={"auto"} flexDirection="column" alignItems="center">
        <Text fontSize={48}>Bem vindo ao backoffice</Text>
        <Text fontSize={32}>
          {userLoggedGroup} {userLoggedName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
