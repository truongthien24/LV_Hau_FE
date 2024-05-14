import apiService from "api";
import { useMutation } from "react-query";

const deleteNhaXuatBan = async (params = {}) => {
  const nhaXuatBan = await apiService.nhaXuatBan.deleteNhaXuatBan({
    ...params?.Data,
  });

  return nhaXuatBan;
};

const useDeleteNhaXuatBan = () => {
  return useMutation(deleteNhaXuatBan, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteNhaXuatBan;
