import { Menu, MenuButton, MenuList, MenuItem, Button, Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { CheckIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

const useUsuarios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const onClose = () => {
    setIsOpen(false)
     
  } 

  const openModal = () => {
    setIsOpen(true)
  }

  const handleChange = (event) => setValue(event.target.value);

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const Actions = ({ status }) => {
    return (
      <>
        <IconButton onClick={openModal} colorScheme="yellow" icon={<EditIcon />} />
        <IconButton
          marginLeft={4}
          colorScheme={status !== "ativo" ? "green" : "red"}
          icon={status !== "ativo" ? <CheckIcon /> : <NotAllowedIcon />}

        />
      </>
    );
  };

  const usersList = [
    {
      name: "Victor Beccare",
      email: "vbeccare@email.com",
      status: "Ativo",
      grupo: "Administrador",
      Acoes: () => Actions({ status: "ativo" }),

    },
    {
      name: "Bruna Vieira",
      email: "bruna@email.com",
      status: "inativo",
      grupo: "Administrador",
      Acoes: () => Actions({ status: "inativo" }),
    },
    {
      name: "Victor Beccare",
      email: "vbeccare@email.com",
      status: "Ativo",
      grupo: "Administrador",
      Acoes: () => Actions({ status: "ativo" }),
    },
  ];

  const filteredUsersList = usersList.filter(({ name }) => {
    return name.includes(value);
  });

  return { handleChange, filteredUsersList, value, initialRef, finalRef, isOpen, onClose };

};

export default useUsuarios;

