import { useMutation } from "react-query";
import apiService from "../../../../../api";

const loginAdmin = async (params = {}) => {
  const accounts = await apiService.taiKhoan.adminLogin({
    ...params?.Data,
  });

  return accounts;
};

const useLoginAdmin = () => {
  return useMutation(loginAdmin, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useLoginAdmin;
