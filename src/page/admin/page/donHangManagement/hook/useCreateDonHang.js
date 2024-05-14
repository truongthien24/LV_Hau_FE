import apiService from "api";
import { useMutation } from "react-query";

const createDonHang = async (params = {}) => {
  const donHang = await apiService.donHang.createDonHang({
    ...params?.Data,
  });

  return donHang;
};

const useCreateDonHang = () => {
  return useMutation(createDonHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateDonHang;
