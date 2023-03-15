import { IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { CheckIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";

import { cpf } from "cpf-cnpj-validator";
import { getAllUsers, userSignUp } from "../../../services/users";
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

  const openModal = ({ name, email, group, id }) => {
    if (email === userLoggedEmail) {
      setIsSameUser(true);
    }
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

  const passwordValidator = !password || !confirmPassword || !hasSamePasswords;

  const nameValidator = nameForm.length >= 4;
  const emailValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i.test(emailForm);

  const isButtonDisabled =
    passwordValidator ||
    !cpfValid ||
    !nameValidator ||
    !emailValidator ||
    !groupForm;

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

  const formattedList = usersList.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.ativo ? "ativo" : "desativado",
      group: user.grupo === 1 ? "Administrador" : "Estoquista",
      Acoes: (props) => Actions({ ...props }),
    };
  });

  const filteredUsersList = formattedList.filter(({ name }) => {
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
  };
};

export default useUsuarios;
