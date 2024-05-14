import apiService from "api";
import { useMutation } from "react-query";

const deleteGiamGia = async (params = {}) => {
  const giamGia = await apiService.maGiam.deleteGiamGia({
    ...params?.Data,
  });

  return giamGia;
};

const useDeleteGiamGia = () => {
  return useMutation(deleteGiamGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteGiamGia;
