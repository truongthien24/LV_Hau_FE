import apiServices from "api";
import _ from "lodash";
import { useQuery } from "react-query";

const getApiData = async (data) => {
  const params = data;

  if(_.isEmpty(params?.theLoai) && _.isEmpty(params?.tenSach)) return;

  const sachs = await apiServices.book.findSach({
    ...params,
  });

  return sachs;
};

const useFindDataBook = (data = {}) => {
  const query = useQuery(
    ["find-data-book", data],

    () => getApiData(data),

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

export default useFindDataBook;
