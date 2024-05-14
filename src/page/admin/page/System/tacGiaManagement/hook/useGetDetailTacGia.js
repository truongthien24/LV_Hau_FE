import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const tacGia = await apiServices.tacGia.getTacGiaByID({
    ...params,
  });

  return tacGia;
};

const useGetDetailTacGia = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-TacGia", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: tacGiaDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { tacGiaDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailTacGia;
