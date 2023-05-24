import { IconButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { getAllOrders, putStatus } from "../../../services/orders";

const useUsuarios = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [value, setValue] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [orderNumber, setOrderNumber] = useState();
  const [orderStatus, setOrderStatus] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const initialChangeRef = useRef(null);
  const finalChangeRef = useRef(null);

  const onClose = () => {
    setIsEditOpen(false);
  };

  const openModal = ({ id, status }) => {
    setOrderNumber(id);
    setOrderStatus(status);
    setIsEditOpen(true);
  };

  const handleChange = (event) => setValue(event.target.value);

  const updateOrder = () => {
    console.log({ orderNumber });
    const payload = {
      id: orderNumber,
      status: orderStatus,
    };

    putStatus(payload)
      .then(() => {
        alert("Pedido atualizado com sucesso");
        getAllOrders().then((res) => {
          const orderList = res.data;
          const formattedOrders = orderList.map((order) => {
            return {
              orderNumber: order.id,
              date: order.dataCompra,
              totalValue: order.totalGeral,
              status: order.status,
              Acoes: (props) => Actions({ ...props }),
            };
          });
          const listByDate = formattedOrders.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setOrderList(listByDate);
          setIsEditOpen(false);
        });
      })
      .catch(() => {
        alert("Não foi possível atualizar o pedido");
      });
  };

  const Actions = ({ id, status }) => {
    return (
      <>
        <IconButton
          onClick={() => openModal({ id, status })}
          colorScheme="yellow"
          icon={<EditIcon />}
        />
      </>
    );
  };

  const filteredOrdersList = orderList?.filter(({ orderNumber }) => {
    return value ? orderNumber === Number(value) : true;
  });

  useEffect(() => {
    getAllOrders().then((res) => {
      const orderList = res.data;
      const formattedOrders = orderList.map((order) => {
        return {
          orderNumber: order.id,
          date: order.dataCompra,
          totalValue: order.totalGeral,
          status: order.status,
          Acoes: (props) => Actions({ ...props }),
        };
      });
      const listByDate = formattedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrderList(listByDate);
      setIsLoading(false);
    });
  }, []);

  return {
    filteredOrdersList,
    initialChangeRef,
    finalChangeRef,
    isEditOpen,
    onClose,
    orderStatus,
    setOrderStatus,
    isLoading,
    updateOrder,
    handleChange,
    value,
  };
};

export default useUsuarios;
