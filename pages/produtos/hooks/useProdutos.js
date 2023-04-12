import { IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {
  CheckIcon,
  EditIcon,
  NotAllowedIcon,
  ViewIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";

import Router, { useRouter } from "next/router";

import {
  getAllProduct,
  postProduct,
  productUpdateStatus,
  updateProduct,
  getProductbyName,
} from "../../../services/product";
import { getMoneyMask } from "../../../utils/formatters";

const useUsuarios = ({ setPageCount }) => {
  const route = useRouter();
  const page = route.query.page;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [nameForm, setNameForm] = useState("");
  const [idForm, setIdForm] = useState();
  const [value, setValue] = useState("");
  const [productList, setProductList] = useState([]);

  const [priceForm, setPriceForm] = useState();
  const [qtdForm, setQtdForm] = useState();
  const [descricao, setDescricao] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const initialChangeRef = useRef(null);
  const finalChangeRef = useRef(null);
  const initialNewRef = useRef(null);
  const finalNewRef = useRef(null);

  const onClose = () => {
    setPriceForm(0);
    setIsEditOpen(false);
  };

  const openModal = ({ id, name, quantidade, valor, descricao }) => {
    setNameForm(name);
    setIdForm(id);
    setQtdForm(quantidade);
    setPriceForm(getMoneyMask(valor, "R$ ", 2));
    setDescricao(descricao);
    setIsEditOpen(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value) {
      getProductbyName({ name: event.target.value }).then((res) => {
        setPageCount(res.data.totalPages);
        setProductList(res.data.content);
      });
    } else {
      getAllProduct({ page }).then((res) => {
        setPageCount(res.data.totalPages);
        setProductList(res.data.content);
      });
    }
  };

  const handleChangeStatus = (id) => {
    productUpdateStatus({ id: id }).then(() => {
      getAllProduct({ page }).then((res) => {
        setPageCount(res.data.totalPages);
        setProductList(res.data.content);
        setIsEditOpen(false);
      });
    });
  };

  const handleUpdateImage = (id) => {
    Router.push(`/imagem-produto/?produto=${id}`);
  };

  const handleVisualizeProduct = (id) => {
    Router.push(`/visualizar-produto/?produto=${id}`);
  };

  const createNewProduct = () => {
    const payload = {
      name: nameForm,
      descricao: descricao,
      avaliacao: [],
      preco: parseFloat(
        priceForm.replace("R$ ", "").replace(".", "").replace(",", ".")
      ),
      quantidade: Number(qtdForm),
      isAtivo: true,
    };

    postProduct(payload)
      .then(() => {
        alert("cadastro realizado com sucesso");
        getAllProduct({ page }).then((res) => {
          setPageCount(res.data.totalPages);
          setProductList(res.data.content);
          setPriceForm(0);
          setIsNewOpen(false);
        });
      })
      .catch(() => {
        alert("cadastro não foi realizado");
      });
  };

  const handleUpdateProduct = () => {
    const payload = {
      id: idForm,
      name: nameForm,
      descricao: descricao,
      preco: parseFloat(
        priceForm.replace("R$ ", "").replace(".", "").replace(",", ".")
      ),
      quantidade: Number(qtdForm),
      avaliacao: "",
    };

    updateProduct(payload)
      .then(() => {
        alert("Produto atualizado com sucesso");
        getAllProduct({ page }).then((res) => {
          setPageCount(res.data.totalPages);
          setProductList(res.data.content);
          setIsEditOpen(false);
        });
      })
      .catch(() => {
        alert("Não foi possível atualizar o produto");
      });
  };

  const nameValidator = nameForm.length >= 4;

  const isButtonDisabled =
    !nameValidator || !priceForm || !descricao || !qtdForm;

  const Actions = ({
    id,
    name,
    quantidade,
    valor,
    status,
    descricao,
    avaliacao,
    imagens,
  }) => {
    return (
      <>
        <IconButton
          onClick={() =>
            openModal({
              id,
              name,
              quantidade,
              valor,
              status,
              descricao,
              avaliacao,
              imagens,
            })
          }
          colorScheme="yellow"
          icon={<EditIcon />}
        />
        <IconButton
          onClick={() => handleChangeStatus(id)}
          marginLeft={4}
          colorScheme={status !== "ativo" ? "green" : "red"}
          icon={status !== "ativo" ? <CheckIcon /> : <NotAllowedIcon />}
        />
        <IconButton
          onClick={() => handleUpdateImage(id)}
          marginLeft={4}
          colorScheme={"purple"}
          icon={<AttachmentIcon />}
        />
        <IconButton
          onClick={() => handleVisualizeProduct(id)}
          marginLeft={4}
          colorScheme={"blue"}
          icon={<ViewIcon />}
        />
      </>
    );
  };

  const formattedList = productList.map((product) => {
    return {
      id: product.id,
      name: product.name,
      quantidade: product.quantidade,
      valor: product.preco,
      status: product.ativo ? "ativo" : "desativado",
      descricao: product.descricao,
      avaliacao: product.avaliacao,
      imagens: product.imagem,
      Acoes: (props) => Actions({ ...props }),
    };
  });

  const filteredProductList = formattedList.filter(({ name }) => {
    return name.includes(value);
  });

  useEffect(() => {
    getAllProduct({ page }).then((res) => {
      setPageCount(res.data.totalPages);
      setProductList(res.data.content);
      setIsLoading(false);
    });
  }, [page]);

  return {
    handleChange,
    createNewProduct,
    filteredProductList,
    value,
    initialChangeRef,
    finalChangeRef,
    initialNewRef,
    finalNewRef,
    isEditOpen,
    isNewOpen,
    setIsNewOpen,
    onClose,
    nameForm,

    setNameForm,

    isButtonDisabled,

    nameValidator,

    isLoading,
    handleUpdateProduct,

    setPriceForm,
    priceForm,
    setQtdForm,
    qtdForm,
    setDescricao,
    descricao,
  };
};

export default useUsuarios;
