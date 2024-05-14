import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  uploadFile: (params) => {
    return axiosWrapper.post(`/uploads`, {
      ...params,
    });
  },
};
