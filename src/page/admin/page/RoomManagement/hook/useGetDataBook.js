import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  pageIndex = 0,
  pageSize = 0,
) => {

  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const sachs = await apiServices.book.getAllSach({
    ...params,
  });

  return sachs;
};

const useGetDataBook = (
  pageIndex = 0,
  pageSize = 0,
) => {
  const query = useQuery(
    [
      "get-data-book",
      pageIndex,
      pageSize,
    ],

    () =>
      getApiData(
        pageIndex,
        pageSize,
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: sachData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { sachData, isDataLoading, fetchData, isFetching };
};

export default useGetDataBook;
