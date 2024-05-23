import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {

  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const sachs = await apiServices.sanPham.getSanPhamByID({
    ...params,
  });

  return sachs;
};

const useGetDetailSanPham = (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {
  const query = useQuery(
    [
      "get-data-SanPham",
      pageIndex,
      pageSize,
      data,
    ],

    () =>
      getApiData(
        pageIndex,
        pageSize,
        data,
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: sanPhamDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { sanPhamDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailSanPham;
