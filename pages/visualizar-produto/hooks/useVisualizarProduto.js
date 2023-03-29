import { useEffect, useState } from "react";
import { getProductByUuid } from "../../../services/product";
import { useRouter } from "next/router";
import { getMoneyMask } from "../../../utils/formatters";

const useVisualizarProduto = () => {
  const route = useRouter();
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [preco, setPreco] = useState();

  const currentQuery = route.query.produto;

  useEffect(() => {
    if (currentQuery) {
      getProductByUuid({ id: currentQuery }).then((res) => {
        const productInfo = res.data;
        setPreco(getMoneyMask(productInfo.preco, "R$ ", 2));
        setNome(productInfo.name);
        setDescricao(productInfo.descricao);
      });
    }
  }, [currentQuery]);

  return { nome, descricao, preco };
};

export default useVisualizarProduto;
