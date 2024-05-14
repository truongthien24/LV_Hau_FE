import apiService from "api";
import { useMutation } from "react-query";

const updateTheLoai = async (params = {}) => {
  const theLoai = await apiService.theLoai.updateTheLoai({
    ...params?.Data,
  });

  return theLoai;
};

const useUpdateTheLoai = () => {
  return useMutation(updateTheLoai, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateTheLoai;
