import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, userId) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    userId: userId
  };

  const donHangs = await apiServices.donHang.getAllDonHang({
    ...params,
  });

  return donHangs;
};

const useGetDataDonHangs = (pageIndex = 0, pageSize = 0, userId) => {
  const query = useQuery(
    ["get-data-DonHangs", pageIndex, pageSize, userId],

    () => getApiData(pageIndex, pageSize, userId),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: donHangData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { donHangData, isDataLoading, fetchData, isFetching };
};

export default useGetDataDonHangs;
