import apiService from "api";
import { useMutation } from "react-query";

const deleteDanhGia = async (params = {}) => {
  const danhGia = await apiService.danhGia.deleteDanhGia({
    ...params?.Data,
  });

  return danhGia;
};

const useDeleteDanhGia = () => {
  return useMutation(deleteDanhGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteDanhGia;
