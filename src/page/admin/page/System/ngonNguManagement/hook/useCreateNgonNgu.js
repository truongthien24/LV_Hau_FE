import apiService from "api";
import { useMutation } from "react-query";

const createNgonNgu = async (params = {}) => {
  const ngonNgu = await apiService.ngonNgu.createNgonNgu({
    ...params?.Data,
  });

  return ngonNgu;
};

const useCreateNgonNgu = () => {
  return useMutation(createNgonNgu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateNgonNgu;
