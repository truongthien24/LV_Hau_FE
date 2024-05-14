import apiService from "api";
import { useMutation } from "react-query";

const updateBaiViet = async (params = {}) => {
  const baiViet = await apiService.baiViet.updateBaiViet({
    ...params?.Data,
  });

  return baiViet;
};

const useUpdateBaiViet = () => {
  return useMutation(updateBaiViet, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateBaiViet;
