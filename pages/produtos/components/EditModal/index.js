import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

const EditModal = ({
  initialChangeRef,
  finalChangeRef,
  isEditOpen,
  onClose,
  updateProduct,
  isAdmin,
  nameForm,
  setNameForm,
  priceForm,
  handleInputNumberChange,
  qtdForm,
  setQtdForm,
  setDescricao,
  descricao,
}) => {
  return (
    <Modal
      initialFocusRef={initialChangeRef}
      finalFocusRef={finalChangeRef}
      isOpen={isEditOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alterar produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              ref={initialChangeRef}
              value={nameForm}
              placeholder="Nome"
              isReadOnly={!isAdmin}
              onChange={(e) => setNameForm(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              value={descricao}
              isReadOnly={!isAdmin}
              placeholder="Descreva o produto"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Preço</FormLabel>
            <Input
              value={priceForm}
              isReadOnly={!isAdmin}
              placeholder="Preço"
              inputMode="number"
              onChange={(e) => {
                handleInputNumberChange(e.target.value);
              }}
            ></Input>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantidade</FormLabel>
            <Input
              value={qtdForm}
              placeholder="Quantidade"
              onChange={(e) => setQtdForm(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={updateProduct}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
