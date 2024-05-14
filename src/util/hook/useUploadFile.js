import apiService from "api";
import { useMutation } from "react-query";

const uploadFile = async (params = {}) => {
  const accounts = await apiService.file.uploadFile({
    ...params?.Data,
  });

  return accounts;
};

const useUploadFile = () => {
  return useMutation(uploadFile, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUploadFile;
