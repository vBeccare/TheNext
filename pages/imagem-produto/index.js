import { Flex, Grid, Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";
import ImageViewer from "react-simple-image-viewer";
import Header from "../../components/Header";

import useImage from "./hooks/useImage";

const imagemProduto = () => {
  const {
    images,
    currentImage,
    isViewerOpen,
    imagesUrl,
    openImageViewer,
    closeImageViewer,
    onClickInputImage,
    handleRemoveImage,
    handleUpdateImage,
    inputImage,
    handleSetDefault,
    imagePrincipal,
  } = useImage();

  return (
    <Flex flexDirection="column">
      <Header />
      <IconButton
        onClick={onClickInputImage}
        marginTop={16}
        marginLeft={16}
        padding={16}
        maxWidth="50px"
        colorScheme={"green"}
        icon={<AddIcon />}
      />
      <input
        style={{ visibility: "hidden" }}
        type="file"
        name="file"
        ref={inputImage}
        onChange={handleUpdateImage}
      />

      <Grid
        marginLeft={16}
        templateColumns="repeat(4, 1fr)"
        gap={6}
        overflowX="scroll"
      >
        {images.map((file, index) => {
          return (
            <Flex flexDirection="column" minWidth={100} marginRight={16}>
              <Image
                src={file.file}
                onClick={() => openImageViewer(index)}
                boxSize="250px"
                key={index}
                alt={file.fileName}
              />
              <Flex width="80%">
                <IconButton
                  onClick={() => handleRemoveImage(file.id)}
                  borderRadius={0}
                  isDisabled={file.id === imagePrincipal}
                  colorScheme={"red"}
                  width="50%"
                  icon={<CloseIcon />}
                />
                <IconButton
                  onClick={() => handleSetDefault(file.id)}
                  borderRadius={0}
                  isDisabled={file.id === imagePrincipal}
                  colorScheme={"yellow"}
                  width="50%"
                  icon={<StarIcon />}
                />
              </Flex>
            </Flex>
          );
        })}

        {isViewerOpen && (
          <ImageViewer
            src={imagesUrl}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
            onClose={closeImageViewer}
          />
        )}
      </Grid>
    </Flex>
  );
};

export default imagemProduto;
