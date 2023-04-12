import axios from "axios";

export const userLogin = (payload) => {
  return axios.post("http://localhost:8080/usuarios/logar", payload);
};

export const userSignUp = (payload) => {
  return axios.post("http://localhost:8080/usuarios/cadastrar", payload);
};

export const userUpdate = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.put("http://localhost:8080/usuarios/atualizar", payload, config);
};

export const userUpdateStatus = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.put("http://localhost:8080/usuarios/atualizar-status", payload, config);
};

export const getAllUsers = () => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };

  return axios.get("http://localhost:8080/usuarios/all", config);
};
