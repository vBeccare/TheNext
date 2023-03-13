import { IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { CheckIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

const useUsuarios = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [nameForm, setNameForm] = useState();
  const [emailForm, setEmailForm] = useState();
  const [groupForm, setGroupForm] = useState();
  const [idForm, setIdForm] = useState();
  const [value, setValue] = useState("");

  const initialChangeRef = useRef(null);
  const finalChangeRef = useRef(null);
  const initialNewRef = useRef(null);
  const finalNewRef = useRef(null);

  const onClose = () => {
    setIsEditOpen(false);
  };

  const openModal = ({ name, email, group, id }) => {
    setNameForm(name);
    setEmailForm(email);
    setGroupForm(group);
    setIdForm(id);
    setIsEditOpen(true);
  };

  const handleChange = (event) => setValue(event.target.value);

  const handleChangeStatus = (status, id) => {
    //bater na rota para mudar o status atual
    console.log({ status });
  };

  console.log({ nameForm, emailForm, groupForm });

  const Actions = ({ id, status, name, email, group }) => {
    return (
      <>
        <IconButton
          onClick={() => openModal({ name, email, group, id })}
          colorScheme="yellow"
          icon={<EditIcon />}
        />
        <IconButton
          onClick={() => handleChangeStatus(status, id)}
          marginLeft={4}
          colorScheme={status !== "ativo" ? "green" : "red"}
          icon={status !== "ativo" ? <CheckIcon /> : <NotAllowedIcon />}
        />
      </>
    );
  };

  const usersList = [
    {
      id: "",
      name: "Victor Beccare",
      email: "vbeccare@email.com",
      status: "ativo",
      group: "Administrador",
      Acoes: (props) => Actions({ ...props }),
    },
    {
      id: "",
      name: "Bruna Vieira",
      email: "bruna@email.com",
      status: "inativo",
      group: "Administrador",
      Acoes: (props) => Actions({ ...props }),
    },
    {
      id: "",
      name: "Victor Beccare",
      email: "vbeccare@email.com",
      status: "ativo",
      group: "Administrador",
      Acoes: (props) => Actions({ ...props }),
    },
  ];

  const filteredUsersList = usersList.filter(({ name }) => {
    return name.includes(value);
  });

  useEffect(() => {
    //bater na rota para trazer os novos usuarios
  }, []);

  return {
    handleChange,
    filteredUsersList,
    value,
    initialChangeRef,
    finalChangeRef,
    initialNewRef,
    finalNewRef,
    isEditOpen,
    isNewOpen,
    setIsNewOpen,
    onClose,
    nameForm,
    emailForm,
    groupForm,
    setNameForm,
    setGroupForm,
  };
};

export default useUsuarios;
