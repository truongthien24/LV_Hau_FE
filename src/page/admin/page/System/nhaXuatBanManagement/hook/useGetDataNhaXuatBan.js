import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const nhaXuatBans = await apiServices.nhaXuatBan.getAllNhaXuatBan({
    ...params,
  });

  return nhaXuatBans;
};

const useGetDataNhaXuatBan = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-NhaXuatBan", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: nhaXuatBanData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { nhaXuatBanData, isDataLoading, fetchData, isFetching };
};

export default useGetDataNhaXuatBan;
