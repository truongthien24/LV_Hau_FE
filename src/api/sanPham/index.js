import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllSanPham: (params) => {
    return axiosWrapper.get(`/getAllSanPham`, {
      ...params,
    });
  },

  findSanPham: (params) => {
    return axiosWrapper.post(`/findSanPham`, {
      ...params,
    });
  },

  createSanPham: (params) => {
    return axiosWrapper.post(`/createSanPham`, {
      ...params,
    });
  },

  getSanPhamByID: (params) => {
    return axiosWrapper.get(`/getSanPhamByID/${params?.data}`, {
      ...params,
    });
  },

  updateSanPham: (params) => {
    return axiosWrapper.patch(`/updateSanPham/${params?._id}`, {
      ...params,
    });
  },

  deleteSanPham: (params) => {
    return axiosWrapper.delete(`/deleteSanPham/${params?._id}`, {
      ...params,
    });
  }
};
