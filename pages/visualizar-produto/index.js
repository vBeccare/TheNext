import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import ImageViewer from "react-simple-image-viewer";

import useVisualizarProduto from "./hooks/useVisualizarProduto";
import Rating from "../../components/Rating";

const VisualizarProduto = () => {
  const {
    nome,
    descricao,
    preco,
    images,
    imagesUrl,
    imagePrincipal,
    selectedViewImage,
    isViewerOpen,
    currentImage,
    closeImageViewer,
    openImageViewer,
    imagePrincipalId,
    avaliacao,
  } = useVisualizarProduto();

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
            objectFit="contain"
            cursor="pointer"
            onClick={() => openImageViewer(imagePrincipalId)}
            src={imagePrincipal}
          />
          <Flex marginTop={4} gap={6} maxWidth="450px" overflow="scroll">
            {images.map((image) => {
              return (
                <Image
                  width="80px"
                  objectFit="cover"
                  height="80px"
                  cursor="pointer"
                  src={image.file}
                  onClick={() => selectedViewImage(image.id)}
                />
              );
            })}
          </Flex>
        </Flex>
        <Flex
          marginLeft="16px"
          padding="32px"
          backgroundColor="#d9d9d9"
          borderRadius="8px"
          minWidth={450}
          flexDirection="column"
        >
          <Text marginBottom="20px" fontSize={30}>
            {nome}
          </Text>
          <Text maxWidth="700px" fontSize={16}>
            {descricao}
          </Text>
          <Rating avaliacao={avaliacao} />
          <Text marginTop="26px" maxWidth="1200px" fontSize={25}>
            {preco}
          </Text>
          <Button marginTop="200px" colorScheme="teal" mb={2}>
            Comprar
          </Button>
        </Flex>

        {isViewerOpen && (
          <ImageViewer
            src={imagesUrl}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
            onClose={closeImageViewer}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default VisualizarProduto;
