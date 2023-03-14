import axios from "axios";

export const userLogin = (payload) => {
  return axios.post("http://localhost:8080/usuarios/logar", payload);
};

export const userSignUp = (payload) => {
  return axios.post("http://localhost:8080/usuarios/cadastrar", payload);
};

export const getAllUsers = (payload) => {
  return axios.post("http://localhost:8080/usuarios/all", payload);
};
