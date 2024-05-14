import apiService from "api";
import { useMutation } from "react-query";

const updateNhaXuatBan = async (params = {}) => {
  const nhaXuatBan = await apiService.nhaXuatBan.updateNhaXuatBan({
    ...params?.Data,
  });

  return nhaXuatBan;
};

const useUpdateNhaXuatBan = () => {
  return useMutation(updateNhaXuatBan, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateNhaXuatBan;
