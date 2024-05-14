import apiService from "api";
import { useMutation } from "react-query";

const createGioHang = async (params = {}) => {
  const gioHang = await apiService.gioHang.createGioHang({
    ...params?.Data,
  });

  return gioHang;
};

const useCreateGioHang = () => {
  return useMutation(createGioHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateGioHang;
