import apiService from "api";
import { useMutation } from "react-query";

const deleteSanPham = async (params = {}) => {
  const accounts = await apiService.sanPham.deleteSanPham({
    ...params?.Data,
  });

  return accounts;
};

const useDeleteSanPham = () => {
  return useMutation(deleteSanPham, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useDeleteSanPham;
