import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllKhachHang: (params) => {
    return axiosWrapper.get(`/getAllKhachHang`, {
      ...params,
    });
  },

  getKhachHangByID: (params) => {
    return axiosWrapper.get(`/getKhachHangByID/${params?.data}`, {
      ...params,
    });
  },


  deleteKhachHang: (params) => {
    return axiosWrapper.delete(`/deleteKhachHang/${params?._id}`, {
      ...params,
    });
  },
};
