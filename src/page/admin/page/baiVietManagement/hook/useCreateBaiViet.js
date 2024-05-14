import apiService from "api";
import { useMutation } from "react-query";

const createBaiViet = async (params = {}) => {
  const baiViet = await apiService.baiViet.createBaiViet({
    ...params?.Data,
  });

  return baiViet;
};

const useCreateBaiViet = () => {
  return useMutation(createBaiViet, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateBaiViet;
