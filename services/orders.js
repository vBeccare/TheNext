import axios from "axios";

export const getAllOrders = () => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };

  return axios.get(`http://localhost:8080/carrinhos/all`, config);
};

export const putStatus = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.put(
    `http://localhost:8080/carrinhos/atualizar-status`,
    payload,
    config
  );
};

export const postCart = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.post(
    "http://localhost:8080/carrinhos/cadastrar",
    payload,
    config
  );
};
