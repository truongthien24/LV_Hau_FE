import apiService from "api";
import { useMutation } from "react-query";

const sendMailAPI = async (params = {}) => {
  const payment = await apiService.gioHang.sendMail({
    ...params?.Data,
  });

  return payment;
};

const useSendMailPaymentSuccess = () => {
  return useMutation(sendMailAPI, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useSendMailPaymentSuccess;
