import apiService from "api";
import { useMutation } from "react-query";

const updateDanhGia = async (params = {}) => {
  const danhGia = await apiService.danhGia.updateDanhGia({
    ...params?.Data,
  });

  return danhGia;
};

const useUpdateDanhGia = () => {
  return useMutation(updateDanhGia, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateDanhGia;
