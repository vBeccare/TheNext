import { IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {
  CheckIcon,
  EditIcon,
  NotAllowedIcon,
  ViewIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";

import Router from "next/router";

import { cpf } from "cpf-cnpj-validator";
import { getAllUsers, userSignUp, userUpdate } from "../../../services/users";
import useLocal from "../../../hooks/useLocal";

const useUsuarios = () => {
  const { userLoggedEmail } = useLocal();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [groupForm, setGroupForm] = useState();
  const [idForm, setIdForm] = useState();
  const [value, setValue] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const hasSamePasswords = password === confirmPassword;

  const [cpfForm, setCpfForm] = useState("");
  const [cpfValid, setCpfValid] = useState(true);

  const isCpfValid = (value) => {
    const cpfNumbers = value.replaceAll(".", "").replace("-", "");
    setCpfValid(cpf.isValid(cpfNumbers));
  };

  const initialChangeRef = useRef(null);
  const finalChangeRef = useRef(null);
  const initialNewRef = useRef(null);
  const finalNewRef = useRef(null);

  const onClose = () => {
    setIsEditOpen(false);
    setIsSameUser(false);
  };

  const openModal = ({ name, email, group, id, cpf }) => {
    if (email === userLoggedEmail) {
      setIsSameUser(true);
    }
    setNameForm(name);
    setEmailForm(email);
    setGroupForm(group);
    setCpfForm(cpf);
    setIdForm(id);
    setIsEditOpen(true);
  };

  const handleChange = (event) => setValue(event.target.value);

  const handleChangeStatus = (status, id) => {
    //bater na rota para mudar o status atual
    console.log({ status });
  };

  const handleVisualizeProduct = (id) => {
    Router.push(`/visualizar-produto/?produto=${id}`);
  };

  const createNewUser = () => {
    const payload = {
      name: nameForm,
      password: password,
      usuario: emailForm,
      email: emailForm,
      cpf: parseInt(cpfForm.replaceAll(".", "").replace("-", "")),
      grupo: groupForm === "Administrador" ? 1 : 2,
      ativo: true,
    };

    userSignUp(payload)
      .then(() => {
        alert("cadastro realizado com sucesso");
        getAllUsers().then((res) => {
          setUsersList(res.data);
          setIsNewOpen(false);
        });
      })
      .catch(() => {
        alert("cadastro não foi realizado");
      });
  };

  const updateUser = () => {
    const payload = {
      name: nameForm,
      password: password,
      usuario: emailForm,
      email: emailForm,
      cpf: parseInt(cpfForm.replaceAll(".", "").replace("-", "")),
      grupo: groupForm === "Administrador" ? 1 : 2,
      ativo: true,
    };

    userUpdate(payload)
      .then(() => {
        alert("Usuário atualizado com sucesso");
        getAllUsers().then((res) => {
          setUsersList(res.data);
          setIsEditOpen(false);
        });
      })
      .catch(() => {
        alert("Não foi possível atualizar o usuário");
      });
  };

  const passwordValidator = !password || !confirmPassword || !hasSamePasswords;

  const nameValidator = nameForm.length >= 4;
  const emailValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i.test(emailForm);

  const isButtonDisabled =
    passwordValidator ||
    !cpfValid ||
    !nameValidator ||
    !emailValidator ||
    !groupForm;

  const Actions = ({ id, status, name, email, group, cpf }) => {
    return (
      <>
        <IconButton
          onClick={() => openModal({ name, email, group, id, cpf })}
          colorScheme="yellow"
          icon={<EditIcon />}
        />
        <IconButton
          onClick={() => handleChangeStatus(status, id)}
          marginLeft={4}
          colorScheme={status !== "ativo" ? "green" : "red"}
          icon={status !== "ativo" ? <CheckIcon /> : <NotAllowedIcon />}
        />
        <IconButton
          onClick={() => handleChangeStatus(status, id)}
          marginLeft={4}
          colorScheme={"purple"}
          icon={<AttachmentIcon />}
        />
        <IconButton
          onClick={() => handleVisualizeProduct(id)}
          marginLeft={4}
          colorScheme={"blue"}
          icon={<ViewIcon />}
        />
      </>
    );
  };

  const formattedList = usersList.map((product) => {
    return {
      id: product.id,
      name: product.name,
      email: product.email,
      cpf: product.cpf,
      status: product.ativo ? "ativo" : "desativado",
      group: product.grupo === 1 ? "Administrador" : "Estoquista",
      Acoes: (props) => Actions({ ...props }),
    };
  });

  const filteredProductList = formattedList.filter(({ name }) => {
    return name.includes(value);
  });

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsersList(res.data);
      setIsLoading(false);
    });
  }, []);

  return {
    handleChange,
    createNewUser,
    filteredProductList,
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
    setEmailForm,
    isButtonDisabled,

    cpfValid,
    isCpfValid,
    setCpfForm,

    setConfirmPassword,
    setPassword,
    hasSamePasswords,

    nameValidator,
    emailValidator,
    groupForm,

    isLoading,
    isSameUser,
    updateUser,
  };
};

export default useUsuarios;
