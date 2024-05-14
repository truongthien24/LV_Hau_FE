import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const donHang = await apiServices.donHang.getDonHangByID({
    ...params,
  });

  return donHang;
};

const useGetDetailDonHang = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-DonHang", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: donHangDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { donHangDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailDonHang;
