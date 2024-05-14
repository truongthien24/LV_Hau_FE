import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllNhaXuatBan: (params) => {
    return axiosWrapper.get(`/getAllNhaXuatBan`, {
      ...params,
    });
  },

  createNhaXuatBan: (params) => {
    return axiosWrapper.post(`/createNhaXuatBan`, {
      ...params,
    });
  },

  getNhaXuatBanByID: (params) => {
    return axiosWrapper.get(`/getNhaXuatBanByID/${params?.data}`, {
      ...params,
    });
  },

  updateNhaXuatBan: (params) => {
    return axiosWrapper.patch(`/updateNhaXuatBan/${params?._id}`, {
      ...params,
    });
  },

  deleteNhaXuatBan: (params) => {
    return axiosWrapper.delete(`/deleteNhaXuatBan/${params?._id}`, {
      ...params,
    });
  },
};
