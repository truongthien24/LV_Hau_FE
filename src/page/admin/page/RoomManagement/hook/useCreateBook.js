import apiService from "api";
import { useMutation } from "react-query";

const createBook = async (params = {}) => {
  const accounts = await apiService.book.createSach({
    ...params?.Data,
  });

  return accounts;
};

const useCreateBook = () => {
  return useMutation(createBook, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateBook;
