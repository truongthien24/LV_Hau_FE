import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllNhaCungCap: (params) => {
    return axiosWrapper.get(`/getAllNhaCungCap`, {
      ...params,
    });
  },

  createNhaCungCap: (params) => {
    return axiosWrapper.post(`/createNhaCungCap`, {
      ...params,
    });
  },

  getNhaCungCapByID: (params) => {
    return axiosWrapper.get(`/getNhaCungCapByID/${params?.data}`, {
      ...params,
    });
  },

  updateNhaCungCap: (params) => {
    return axiosWrapper.patch(`/updateNhaCungCap/${params?._id}`, {
      ...params,
    });
  },

  deleteNhaCungCap: (params) => {
    return axiosWrapper.delete(`/deleteNhaCungCap/${params?._id}`, {
      ...params,
    });
  },
};
