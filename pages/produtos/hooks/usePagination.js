import Router from "next/router";
import { useRouter } from "next/router";
import { useState } from "react";

const usePagination = () => {
  const route = useRouter();
  const [pageCount, setPageCount] = useState();

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
    setPageCount,
    pageCount
  };
};

export default usePagination;
