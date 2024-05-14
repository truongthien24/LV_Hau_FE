import apiService from "api";
import { useMutation } from "react-query";

const createNhaXuatBan = async (params = {}) => {
  const nhaXuatBan = await apiService.nhaXuatBan.createNhaXuatBan({
    ...params?.Data,
  });

  return nhaXuatBan;
};

const useCreateNhaXuatBan = () => {
  return useMutation(createNhaXuatBan, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateNhaXuatBan;
