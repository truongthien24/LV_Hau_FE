import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const gioHang = await apiServices.gioHang.getGioHangByID({
    ...params,
  });

  return gioHang;
};

const useGetDetailGioHang = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-GioHang", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: gioHangDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { gioHangDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailGioHang;
