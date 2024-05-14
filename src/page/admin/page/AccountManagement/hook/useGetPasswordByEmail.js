import apiService from "api";
import { useMutation, useQuery } from "react-query";

const getAccount = async (params = {}) => {
  const accounts = await apiService.taiKhoan.getPasswordByEmail({
    ...params?.Data,
  });

  return accounts;
};

const useGetPasswordByEmail = () => {
  return useMutation(getAccount, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useGetPasswordByEmail;
