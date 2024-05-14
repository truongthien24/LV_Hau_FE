import apiService from "api";
import { useMutation } from "react-query";

const createTheLoai = async (params = {}) => {
  const theLoai = await apiService.theLoai.createTheLoai({
    ...params?.Data,
  });

  return theLoai;
};

const useCreateTheLoai = () => {
  return useMutation(createTheLoai, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateTheLoai;
