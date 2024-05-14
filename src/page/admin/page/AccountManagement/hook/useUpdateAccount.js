import apiService from "api";
import { useMutation } from "react-query";

const updateApi = async (params = {}) => {
  const accounts = await apiService.taiKhoan.updateTaiKhoan({
    ...params?.Data,
  });

  return accounts;
};

const useUpdateAccount = () => {
  return useMutation(updateApi, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateAccount;
