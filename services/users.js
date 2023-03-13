import axios from "axios";

export const userLogin = (payload) => {
  return axios.post("http://localhost:8080/login", payload);
};
