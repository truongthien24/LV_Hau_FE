import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllDonHang: (params) => {
    return axiosWrapper.post(`/getAllDonHang`, {
      ...params,
    });
  },

  createDonHang: (params) => {
    return axiosWrapper.post(`/createDonHang`, {
      ...params,
    });
  },

  getDonHangByID: (params) => {
    return axiosWrapper.get(`/getDonHangByID/${params?.data}`, {
      ...params,
    });
  },

  updateDonHang: (params) => {
    return axiosWrapper.patch(`/updateDonHang/${params?._id}`, {
      ...params,
    });
  },

  deleteDonHang: (params) => {
    return axiosWrapper.delete(`/deleteDonHang/${params?._id}`, {
      ...params,
    });
  },
};
