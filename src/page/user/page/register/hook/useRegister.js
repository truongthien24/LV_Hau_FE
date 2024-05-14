import { useMutation } from "react-query";
import apiService from "../../../../../api";

const registerUser = async (params = {}) => {
  const accounts = await apiService.taiKhoan.userRegister({
    ...params?.Data,
  });

  return accounts;
};

const useRegister = () => {
  return useMutation(registerUser, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useRegister;
