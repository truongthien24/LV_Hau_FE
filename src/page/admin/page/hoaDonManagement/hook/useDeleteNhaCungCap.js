import apiService from "api";
import { useMutation } from "react-query";

const deleteNhaCungCap = async (params = {}) => {
  const nhaCungCap = await apiService.nhaCungCap.deleteNhaCungCap({
    ...params?.Data,
  });

  return nhaCungCap;
};

const useDeleteNhaCungCap = () => {
  return useMutation(deleteNhaCungCap, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteNhaCungCap;
