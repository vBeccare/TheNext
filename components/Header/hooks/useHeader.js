import Router from "next/router";
import { useRouter } from "next/router";

const useHeader = () => {
  const routeInfos = useRouter();

  const isProductPath = routeInfos.pathname === "/produtos";
  const isUserPath = routeInfos.pathname === "/usuarios";

  const handleSignIn = () => {
    Router.push("/");
  };
  const handleUsers = () => {
    Router.push("/usuarios");
  };
  const handleProducts = () => {
    Router.push("/produtos");
  };
  const handleHome = () => {
    Router.push("/home");
  };

  return {
    handleSignIn,
    handleUsers,
    handleProducts,
    handleHome,
		isProductPath,
		isUserPath
  };
};

export default useHeader;
