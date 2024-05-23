import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  pageIndex = 0,
  pageSize = 0,
) => {

  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const sachs = await apiServices.sanPham.getAllSanPham({
    ...params,
  });

  return sachs;
};

const useGetDataSanPham = (
  pageIndex = 0,
  pageSize = 0,
) => {
  const query = useQuery(
    [
      "get-data-book",
      pageIndex,
      pageSize,
    ],

    () =>
      getApiData(
        pageIndex,
        pageSize,
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: sanPhamData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { sanPhamData, isDataLoading, fetchData, isFetching };
};

export default useGetDataSanPham;
