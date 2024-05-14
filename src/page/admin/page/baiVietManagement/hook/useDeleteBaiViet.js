import apiService from "api";
import { useMutation } from "react-query";

const deleteBaiViet = async (params = {}) => {
  console.log("params", params);
  const baiViet = await apiService.baiViet.deleteBaiViet({
    ...params?.Data,
  });

  return baiViet;
};

const useDeleteBaiViet = () => {
  return useMutation(deleteBaiViet, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useDeleteBaiViet;
