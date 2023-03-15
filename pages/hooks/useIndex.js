import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import { userLogin } from "../../services/users";

const useIndex = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSignUp = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("grupo", data.grupo);
    localStorage.setItem("email", data.email);
    localStorage.setItem("nome", data.name);
    Router.push("/home");
  };

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const payload = { email: email, password: password };

  const handleLogin = () => {
    userLogin(payload)
      .then((res) => {
        handleSignUp(res.data);
      })
      .catch(() => {
        toast({
          title: "Login",
          description: "Falha ao tentar entrar",
          position: "top-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
