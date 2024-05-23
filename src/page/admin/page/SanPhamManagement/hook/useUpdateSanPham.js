import apiService from "api";
import { useMutation } from "react-query";

const updateBook = async (params = {}) => {
  const accounts = await apiService.sanPham.updateSanPham({
    ...params?.Data,
  });

  return accounts;
};

const useUpdateSanPham = () => {
  return useMutation(updateBook, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateSanPham;
