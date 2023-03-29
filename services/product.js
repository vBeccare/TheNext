import axios from "axios";

export const getAllProduct = ({ page }) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };

  return axios.get(`http://localhost:8080/produtos/all?size=10&page=${page - 1}`, config);
};

export const getProductByUuid = (id) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };

  return axios.get(`http://localhost:8080/produtos/produto/${id}`, config);
};

export const postProduct = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.post(
    "http://localhost:8080/produtos/cadastrar",
    payload,
    config
  );
};

export const updateProduct = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.put("http://localhost:8080/produtos/atualizar", payload, config);
};

export const productUpdateStatus = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.put(
    "http://localhost:8080/produtos/atualizar-status",
    payload,
    config
  );
};
