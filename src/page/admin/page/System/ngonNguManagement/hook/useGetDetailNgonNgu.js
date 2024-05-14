import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const ngonNgu = await apiServices.ngonNgu.getNgonNguByID({
    ...params,
  });

  return ngonNgu;
};

const useGetDetailNgonNgu = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-NgonNgu", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: ngonNguDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { ngonNguDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailNgonNgu;
