import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const theLoais = await apiServices.theLoai.getAllTheLoai({
    ...params,
  });

  return theLoais;
};

const useGetDataTheLoai = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-TheLoai", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: theLoaiData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { theLoaiData, isDataLoading, fetchData, isFetching };
};

export default useGetDataTheLoai;
