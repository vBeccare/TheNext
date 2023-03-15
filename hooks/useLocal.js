import { useEffect, useState } from "react";

const useLocal = () => {
  const [userLoggedGroup, setUserLoggedGroup] = useState();
  const [userLoggedEmail, setUserLoggedEmail] = useState();
  const [userLoggedName, setUserLoggedName] = useState();

  useEffect(() => {
    setUserLoggedGroup(localStorage.getItem("grupo"));
    setUserLoggedEmail(localStorage.getItem("email"));
  }, []);

  const isAdmin = userLoggedGroup === "1";

  return {
    isAdmin,
    userLoggedEmail,
  };
};

export default useLocal;
