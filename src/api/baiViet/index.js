import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllBaiViet: (params) => {
    return axiosWrapper.get(`/getAllBaiViet`, {
      ...params,
    });
  },

  createBaiViet: (params) => {
    return axiosWrapper.post(`/createBaiViet`, {
      ...params,
    });
  },

  getBaiVietByID: (params) => {
    return axiosWrapper.get(`/getBaiVietByID/${params?.data}`, {
      ...params,
    });
  },

  updateBaiViet: (params) => {
    return axiosWrapper.patch(`/updateBaiViet/${params?._id}`, {
      ...params,
    });
  },

  deleteBaiViet: (params) => {
    return axiosWrapper.delete(`/deleteBaiViet/${params?._id}`, {
      ...params,
    });
  },
};
