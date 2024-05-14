import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const giamGia = await apiServices.maGiam.getGiamGiaByID({
    ...params,
  });

  return giamGia;
};

const useGetDetailGiamGia = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-GiamGia", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: giamGiaDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { giamGiaDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailGiamGia;
