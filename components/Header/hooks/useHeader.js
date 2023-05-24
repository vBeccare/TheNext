import Router from "next/router";
import { useRouter } from "next/router";

const useHeader = () => {
  const routeInfos = useRouter();

  const isProductPath = routeInfos.pathname === "/produtos";
  const isUserPath = routeInfos.pathname === "/usuarios";
  const isRequestPath = routeInfos.pathname === "/pedidos";

  const handleSignIn = () => {
    Router.push("/");
  };
  const handleUsers = () => {
    Router.push("/usuarios");
  };
  const handleProducts = () => {
    Router.push("/produtos");
  };
  const handleRequests = () => {
    Router.push("/pedidos");
  };
  const handleHome = () => {
    Router.push("/home");
  };

  return {
    handleSignIn,
    handleUsers,
    handleProducts,
    handleRequests,
    handleHome,
		isProductPath,
		isUserPath,
    isRequestPath
  };
};

export default useHeader;
