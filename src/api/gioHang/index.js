import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllGioHang: (params) => {
    return axiosWrapper.get(`/getAllGioHang`, {
      ...params,
    });
  },

  findGioHang: (params) => {
    return axiosWrapper.post(`/findGioHang`, {
      ...params,
    });
  },

  createGioHang: (params) => {
    return axiosWrapper.post(`/createGioHang`, {
      ...params,
    });
  },

  getGioHangByID: (params) => {
    return axiosWrapper.get(`/getGioHangByID/${params?.data}`, {
      ...params,
    });
  },

  updateGioHang: (params) => {
    return axiosWrapper.patch(`/updateGioHang/${params?._id}`, {
      ...params,
    });
  },

  deleteGioHang: (params) => {
    console.log("params", params);
    return axiosWrapper.delete(`/deleteGioHang/${params?._id}`, {
      ...params,
    });
  },

  deleteSanPhamKhoiGioHang: (params) => {
    return axiosWrapper.delete(`/deleteSanPhamKhoiGioHang/${params?.id}`, {
      ...params,
    });
  },
  checkSanPham: (params) => {
    return axiosWrapper.post(`/checkSanPham`, {
      ...params,
    });
  },

  payment: (params) => {
    return axiosWrapper.post(`/thanhToan`, {
      ...params,
    });
  },

  sendMail: (params) => {
    return axiosWrapper.post("/sendMailGioHang", {
      ...params,
    });
  },
};
