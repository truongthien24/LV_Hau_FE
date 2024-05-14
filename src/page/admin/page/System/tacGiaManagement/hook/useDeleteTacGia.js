import apiService from "api";
import { useMutation } from "react-query";

const deleteTacGia = async (params = {}) => {
  const tacGia = await apiService.tacGia.deleteTacGia({
    ...params?.Data,
  });

  return tacGia;
};

const useDeleteTacGia = () => {
  return useMutation(deleteTacGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteTacGia;
