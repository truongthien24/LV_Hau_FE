import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const ngonNgu = await apiServices.danhGia.getDanhGiaByID({
    ...params,
  });

  return ngonNgu;
};

const useGetDataDanhGiaByIdSanPham = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-NgonNgu", pageIndex, pageSize, data],

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

export default useGetDataDanhGiaByIdSanPham;
