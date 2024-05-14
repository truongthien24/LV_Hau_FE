import apiService from "api";
import { useMutation } from "react-query";

const deleteDonHang = async (params = {}) => {
  const donHang = await apiService.donHang.deleteDonHang({
    ...params?.Data,
  });

  return donHang;
};

const useDeleteDonHang = () => {
  return useMutation(deleteDonHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteDonHang;
