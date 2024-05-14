import apiService from "api";
import { useMutation } from "react-query";

const updateBook = async (params = {}) => {
  const accounts = await apiService.book.updateSach({
    ...params?.Data,
  });

  return accounts;
};

const useUpdateBook = () => {
  return useMutation(updateBook, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateBook;
