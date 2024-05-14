import apiService from "api";
import { useMutation } from "react-query";

const deleteBook = async (params = {}) => {
  console.log('params', params)
  const accounts = await apiService.book.deleteSach({
    ...params?.Data,
  });

  return accounts;
};

const useDeleteBook = () => {
  return useMutation(deleteBook, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useDeleteBook;
