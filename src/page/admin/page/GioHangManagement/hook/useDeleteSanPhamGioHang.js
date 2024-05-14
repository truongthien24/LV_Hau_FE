import apiService from "api";
import { useMutation } from "react-query";

const DeleteSanPhamKhoiGioHang = async (params = {}) => {
  const gioHang = await apiService.gioHang.deleteSanPhamKhoiGioHang({
    ...params?.Data,
  });

  return gioHang;
};

const useDeleteSanPhamKhoiGioHang = () => {
  return useMutation(DeleteSanPhamKhoiGioHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteSanPhamKhoiGioHang;
