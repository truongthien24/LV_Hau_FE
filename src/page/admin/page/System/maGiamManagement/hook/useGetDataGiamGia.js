import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const giamGias = await apiServices.maGiam.getAllGiamGia({
    ...params,
  });

  return giamGias;
};

const useGetDatagiamGia = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-giamGia", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: giamGiaData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { giamGiaData, isDataLoading, fetchData, isFetching };
};

export default useGetDatagiamGia;
