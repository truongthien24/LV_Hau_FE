import apiService from "api";
import { useMutation } from "react-query";

const updateGioHang = async (params = {}) => {
  const gioHang = await apiService.gioHang.updateGioHang({
    ...params?.Data,
  });

  return gioHang;
};

const useUpdateGioHang = () => {
  return useMutation(updateGioHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateGioHang;
