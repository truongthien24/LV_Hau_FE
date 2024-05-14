import apiService from "api";
import { useMutation } from "react-query";

const checkSanPham = async (params = {}) => {
  const gioHang = await apiService.gioHang.checkSanPham({
    ...params?.Data,
  });

  return gioHang;
};

const useCheckSanPham = () => {
  return useMutation(checkSanPham, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCheckSanPham;
