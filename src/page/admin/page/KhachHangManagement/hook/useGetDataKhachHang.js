import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const khachHangs = await apiServices.khachHang.getAllKhachHang({
    ...params,
  });

  return khachHangs;
};

const useGetDataKhachHang = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-KhachHang", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: khachHangData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { khachHangData, isDataLoading, fetchData, isFetching };
};

export default useGetDataKhachHang;
