import apiService from "api";
import { useMutation } from "react-query";

const deleteNgonNgu = async (params = {}) => {
  const ngonNgu = await apiService.ngonNgu.deleteNgonNgu({
    ...params?.Data,
  });

  return ngonNgu;
};

const useDeleteNgonNgu = () => {
  return useMutation(deleteNgonNgu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteNgonNgu;
