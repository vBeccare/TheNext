import { Button, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

const useUsuarios = () => {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const Actions = ({ status }) => {
    return (
      <>
        <IconButton colorScheme="yellow" icon={<EditIcon />} />
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

  return { handleChange, filteredUsersList, value };
};

export default useUsuarios;
