import apiService from "api";
import { useMutation } from "react-query";

const createDanhGia = async (params = {}) => {
  const danhGia = await apiService.danhGia.createDanhGia({
    ...params?.Data,
  });

  return danhGia;
};

const useCreateDanhGia = () => {
  return useMutation(createDanhGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateDanhGia;
