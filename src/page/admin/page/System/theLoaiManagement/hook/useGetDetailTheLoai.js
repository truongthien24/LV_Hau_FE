import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {

  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const theLoai = await apiServices.theLoai.getTheLoaiByID({
    ...params,
  });

  return theLoai;
};

const useGetDetailTheLoai = (
  pageIndex = 0,
  pageSize = 0,
  data,
) => {
  const query = useQuery(
    [
      "get-data-TheLoai",
      pageIndex,
      pageSize,
      data,
    ],

    () =>
      getApiData(
        pageIndex,
        pageSize,
        data,
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: theLoaiDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { theLoaiDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailTheLoai;
