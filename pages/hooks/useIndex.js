import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";

const useIndex = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSignUp = (data = "administrador") => {
    //salvar grupo do user no localStorage
    localStorage.setItem("userGroup", data);
    Router.push("/usuarios");
  };

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleLogin = () => {
    //bater na rota passando atributo de email e senha
    console.log({ email, password });
    //caso der certo, jogar pra tela
    handleSignUp();
    //caso der erro,  mostrar toast
    toast({
      title: "Login",
      description: "Dados incorretos",
      position: "top-right",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    handleSignUp,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
  };
};

export default useIndex;
