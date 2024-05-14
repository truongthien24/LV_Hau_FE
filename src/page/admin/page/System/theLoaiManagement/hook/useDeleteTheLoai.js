import apiService from "api";
import { useMutation } from "react-query";

const deleteTheLoai = async (params = {}) => {
    const theLoai = await apiService.theLoai.deleteTheLoai({
        ...params?.Data,
    });

    return theLoai;
};


const useDeleteTheLoai = () => {
    return useMutation(deleteTheLoai, {
        onSuccess: (_, { onSuccess, status }) => {
            onSuccess(_);
        },
        onError: (error, { onError, context }) => {
            onError(error?.response?.data?.error);
        },
    });
};


export default useDeleteTheLoai;
