import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    Data: data
  };

  const taiKhoans = await apiServices.taiKhoan.getAllTaiKhoan({
    ...params,
  });

  return taiKhoans;
};

const useGetDataTaiKhoan = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-taiKhoan", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: taiKhoanData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { taiKhoanData, isDataLoading, fetchData, isFetching };
};

export default useGetDataTaiKhoan;
