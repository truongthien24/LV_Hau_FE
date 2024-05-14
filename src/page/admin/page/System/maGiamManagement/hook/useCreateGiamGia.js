import apiService from "api";
import { useMutation } from "react-query";

const createGiamGia = async (params = {}) => {
  const giamGia = await apiService.maGiam.createGiamGia({
    ...params?.Data,
  });

  return giamGia;
};

const useCreateGiamGia = () => {
  return useMutation(createGiamGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateGiamGia;
