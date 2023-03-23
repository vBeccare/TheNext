import Router from "next/router";
import { useRouter } from "next/router";

const usePagination = () => {
  const route = useRouter();

  const onChangePage = (page) => {
    const currentPath = route.pathname;
    const currentQuery = route.query;
    currentQuery.page = page.selected + 1;

    Router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return {
    onChangePage,
  };
};

export default usePagination;
