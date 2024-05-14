import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const nhaCungCaps = await apiServices.nhaCungCap.getAllNhaCungCap({
    ...params,
  });

  return nhaCungCaps;
};

const useGetDataNhaCungCap = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-NhaCungCap", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: nhaCungCapData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { nhaCungCapData, isDataLoading, fetchData, isFetching };
};

export default useGetDataNhaCungCap;
