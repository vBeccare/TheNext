import axios from "axios";

export const postImage = (payload) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.post("http://localhost:8080/imagens/cadastrar", payload, config);
};

export const deleteImage = (id) => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.delete(`http://localhost:8080/imagens/${id}`, config);
};