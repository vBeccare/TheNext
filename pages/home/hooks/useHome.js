import { useEffect, useState } from "react";

const useHome = () => {
  const [userLoggedGroup, setUserLoggedGroup] = useState();
  const [userLoggedName, setUserLoggedName] = useState();
  useEffect(() => {
    setUserLoggedGroup(
      localStorage.getItem("grupo") === "1" ? "Administrador" : "Estoquista"
    );
    setUserLoggedName(localStorage.getItem("nome"));
  }, []);

  return {
    userLoggedGroup,
    userLoggedName,
  };
};

export default useHome;
