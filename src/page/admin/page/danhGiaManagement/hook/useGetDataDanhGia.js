import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    Data: data
  };

  const danhGias = await apiServices.danhGia.getAllDanhGia({
    ...params,
  });

  return danhGias;
};

const useGetDataDanhGia = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-danhGia", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: danhGiaData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { danhGiaData, isDataLoading, fetchData, isFetching };
};

export default useGetDataDanhGia;
