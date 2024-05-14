import apiService from "api";
import { useMutation } from "react-query";

const updateGiamGia = async (params = {}) => {
  const giamGia = await apiService.maGiam.updateTacGia({
    ...params?.Data,
  });

  return giamGia;
};

const useUpdateGiamGia = () => {
  return useMutation(updateGiamGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateGiamGia;
