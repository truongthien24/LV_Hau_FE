import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const nhaCungCap = await apiServices.nhaCungCap.getNhaCungCapByID({
    ...params,
  });

  return nhaCungCap;
};

const useGetDetailNhaCungCap = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-NhaCungCap", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: nhaCungCapDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { nhaCungCapDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailNhaCungCap;
