import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const baiViets = await apiServices.baiViet.getAllBaiViet({
    ...params,
  });

  return baiViets;
};

const useGetDataBaiViet = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-baiViet", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: baiVietData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { baiVietData, isDataLoading, fetchData, isFetching };
};

export default useGetDataBaiViet;
