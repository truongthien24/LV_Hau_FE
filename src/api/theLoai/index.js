import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllTheLoai: (params) => {
    return axiosWrapper.get(`/getAllTheLoai`, {
      ...params,
    });
  },

  createTheLoai: (params) => {
    return axiosWrapper.post(`/createTheLoai`, {
      ...params,
    });
  },

  getTheLoaiByID: (params) => {
    return axiosWrapper.get(`/getTheLoaiByID/${params?.data}`, {
      ...params,
    });
  },

  updateTheLoai: (params) => {
    return axiosWrapper.patch(`/updateTheLoai/${params?._id}`, {
      ...params,
    });
  },

  deleteTheLoai: (params) => {
    return axiosWrapper.delete(`/deleteTheLoai/${params?._id}`, {
      ...params,
    });
  }
};
