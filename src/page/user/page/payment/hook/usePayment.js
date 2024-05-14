import apiService from "api";
import { useMutation } from "react-query";

const paymentAPI = async (params = {}) => {
  const payment = await apiService.gioHang.payment({
    ...params?.Data,
  });

  return payment;
};

const usePayment = () => {
  return useMutation(paymentAPI, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default usePayment;
