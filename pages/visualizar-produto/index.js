import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import useVisualizarProduto from "./hooks/useVisualizarProduto";

const VisualizarProduto = () => {
  const { nome, descricao, preco } = useVisualizarProduto();

  return (
    <Flex
      height="100vh"
      marginBottom={16}
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Flex padding="32px" marginX={"auto"}>
        <Flex
          marginY={"auto"}
          flexDirection="column"
          alignItems="center"
          backgroundColor="#d9d9d9"
          borderRadius="8px"
          padding="32px"
        >
          <Image
            width="450px"
            height="450px"
            cursor="pointer"
            src="/iphone14.jpg"
          />
        </Flex>
        <Flex
          marginLeft="16px"
          padding="32px"
          backgroundColor="#d9d9d9"
          borderRadius="8px"
          flexDirection="column"
        >
          <Text marginBottom="20px" fontSize={30}>
            {nome}
          </Text>
          <Text maxWidth="700px" fontSize={16}>
            {descricao}
          </Text>
          <div class="rating">
            <label>&#9733;</label>

            <label>&#9733;</label>

            <label>&#9733;</label>

            <label>&#9734;</label>

            <label>&#9734;</label>
          </div>
          <Text marginTop="26px" maxWidth="1200px" fontSize={25}>
            {preco}
          </Text>
          <Button marginTop="200px" colorScheme="teal" mb={2}>
            Comprar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VisualizarProduto;
