import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {

  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const sachs = await apiServices.book.getSachByID({
    ...params,
  });

  return sachs;
};

const useGetDetailBook = (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {
  const query = useQuery(
    [
      "get-data-book",
      pageIndex,
      pageSize,
      data,
    ],

    () =>
      getApiData(
        pageIndex,
        pageSize,
        data,
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: sachDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { sachDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailBook;
