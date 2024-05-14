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

const useGetDetailDanhGia = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-danhGia", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: danhGiaDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { danhGiaDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailDanhGia;
