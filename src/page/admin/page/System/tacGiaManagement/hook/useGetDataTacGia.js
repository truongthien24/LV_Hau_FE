import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const tacGias = await apiServices.tacGia.getAllTacGia({
    ...params,
  });

  return tacGias;
};

const useGetDataTacGia = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-TacGia", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: tacGiaData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { tacGiaData, isDataLoading, fetchData, isFetching };
};

export default useGetDataTacGia;
