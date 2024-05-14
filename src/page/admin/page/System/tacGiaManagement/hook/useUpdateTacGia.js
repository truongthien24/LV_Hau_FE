import apiService from "api";
import { useMutation } from "react-query";

const updateTacGia = async (params = {}) => {
  const tacGia = await apiService.tacGia.updateTacGia({
    ...params?.Data,
  });

  return tacGia;
};

const useUpdateTacGia = () => {
  return useMutation(updateTacGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateTacGia;
