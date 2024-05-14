import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const nhaXuatBan = await apiServices.nhaXuatBan.getNhaXuatBanByID({
    ...params,
  });

  return nhaXuatBan;
};

const useGetDetailNhaXuatBan = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-NhaXuatBan", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: nhaXuatBanDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { nhaXuatBanDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailNhaXuatBan;
