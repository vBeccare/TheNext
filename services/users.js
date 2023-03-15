import axios from "axios";

export const userLogin = (payload) => {
  return axios.post("http://localhost:8080/usuarios/logar", payload);
};

export const userSignUp = (payload) => {
  return axios.post("http://localhost:8080/usuarios/cadastrar", payload);
};

export const getAllUsers = () => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };

  return axios.get("http://localhost:8080/usuarios/all", config);
};
