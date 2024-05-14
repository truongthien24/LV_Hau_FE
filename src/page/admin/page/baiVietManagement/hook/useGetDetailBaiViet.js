import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const baiViets = await apiServices.baiViet.getBaiVietByID({
    ...params,
  });

  return baiViets;
};

const useGetDetailBaiViet = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-baiViet", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: baiVietDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { baiVietDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailBaiViet;
