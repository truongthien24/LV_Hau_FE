import apiService from "api";
import { useMutation } from "react-query";

const updateNgonNgu = async (params = {}) => {
  const ngonNgu = await apiService.ngonNgu.updateNgonNgu({
    ...params?.Data,
  });

  return ngonNgu;
};

const useUpdateNgonNgu = () => {
  return useMutation(updateNgonNgu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateNgonNgu;
