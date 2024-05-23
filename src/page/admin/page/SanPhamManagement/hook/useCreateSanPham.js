import apiService from "api";
import { useMutation } from "react-query";

const createSanPham = async (params = {}) => {
  const accounts = await apiService.sanPham.createSanPham({
    ...params?.Data,
  });

  return accounts;
};

const useCreateSanPham = () => {
  return useMutation(createSanPham, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateSanPham;
