import { Button, Flex, Image, Text } from "@chakra-ui/react"
import Header from "../../components/Header";

const VisualizarProduto = () => {
    return (
        <Flex
            height="100vh"
            marginBottom={16}
            display="flex"
            flexDirection="column"
        >
            <Header />
            <Flex padding="32px" >
                <Flex marginY={"auto"} flexDirection="column" alignItems="center" backgroundColor="#d9d9d9" borderRadius="8px" padding="32px">
                    <Image
                        width="450px" k
                        height="450px"
                        cursor="pointer"
                        src="/iphone14.jpg"
                    />
                </Flex>
                <Flex marginLeft="16px" padding="32px" backgroundColor="#d9d9d9" borderRadius="8px" flexDirection="column" >
                    <Text marginBottom="20px" fontSize={30}>Apple iPhone 14 Pro Max 1TB Prateado</Text>
                    <Text maxWidth="700px" fontSize={16}>
                        iPhone 14 Pro Max. Câmera grande-angular de 48 MP para capturar detalhes impressionantes.
                        Dynamic Island, uma nova forma de interação no iPhone. Tela Sempre Ativa. E Detecção de
                        Acidente*, um novo recurso de segurança que liga para a emergência se você não puder.
                       
                    </Text>
                    <Text marginTop="26px" maxWidth="1200px" fontSize={25}>
                    R$15.499,00
                    </Text>
                    <Button marginTop="200px" colorScheme="teal" mb={2} >
                        Comprar
                    </Button>
                </Flex>
            </Flex>
        </Flex>

    );
};

export default VisualizarProduto