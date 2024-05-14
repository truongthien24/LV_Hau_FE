import apiService from "api";
import { useMutation } from "react-query";

const updateDonHang = async (params = {}) => {
  const donHang = await apiService.donHang.updateDonHang({
    ...params?.Data,
  });

  return donHang;
};

const useUpdateDonHang = () => {
  return useMutation(updateDonHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateDonHang;
