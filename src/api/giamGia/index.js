import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllGiamGia: (params) => {
    return axiosWrapper.get(`/getAllGiamGia`, {
      ...params,
    });
  },

  createGiamGia: (params) => {
    return axiosWrapper.post(`/createGiamGia`, {
      ...params,
    });
  },

  getGiamGiaByID: (params) => {
    return axiosWrapper.get(`/getGiamGiaByID/${params?.data}`, {
      ...params,
    });
  },

  updateGiamGia: (params) => {
    return axiosWrapper.patch(`/updateGiamGia/${params?._id}`, {
      ...params,
    });
  },

  deleteGiamGia: (params) => {
    return axiosWrapper.delete(`/deleteGiamGia/${params?._id}`, {
      ...params,
    });
  },
};
