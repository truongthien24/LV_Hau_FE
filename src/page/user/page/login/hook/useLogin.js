import { useMutation } from "react-query";
import apiService from "../../../../../api";

const loginUser = async (params = {}) => {
  const accounts = await apiService.taiKhoan.userLogin({
    ...params?.Data,
  });

  return accounts;
};

const useLogin = () => {
  return useMutation(loginUser, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useLogin;
