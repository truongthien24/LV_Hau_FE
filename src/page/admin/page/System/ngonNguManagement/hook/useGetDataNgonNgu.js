import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const ngonNgus = await apiServices.ngonNgu.getAllNgonNgu({
    ...params,
  });

  return ngonNgus;
};

const useGetDataNgonNgu = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-NgonNgu", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: ngonNguData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { ngonNguData, isDataLoading, fetchData, isFetching };
};

export default useGetDataNgonNgu;
