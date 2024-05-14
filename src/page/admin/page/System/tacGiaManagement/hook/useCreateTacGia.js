import apiService from "api";
import { useMutation } from "react-query";

const createTacGia = async (params = {}) => {
  const tacGia = await apiService.tacGia.createTacGia({
    ...params?.Data,
  });

  return tacGia;
};

const useCreateTacGia = () => {
  return useMutation(createTacGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateTacGia;
