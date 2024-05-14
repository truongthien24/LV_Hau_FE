import apiService from "api";
import { useMutation } from "react-query";

const updateNhaCungCap = async (params = {}) => {
  const nhaCungCap = await apiService.nhaCungCap.updateNhaCungCap({
    ...params?.Data,
  });

  return nhaCungCap;
};

const useUpdateNhaCungCap = () => {
  return useMutation(updateNhaCungCap, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateNhaCungCap;
