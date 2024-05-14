import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllNgonNgu: (params) => {
    return axiosWrapper.get(`/getAllNgonNgu`, {
      ...params,
    });
  },

  createNgonNgu: (params) => {
    return axiosWrapper.post(`/createNgonNgu`, {
      ...params,
    });
  },

  getNgonNguByID: (params) => {
    return axiosWrapper.get(`/getNgonNguByID/${params?.data}`, {
      ...params,
    });
  },

  updateNgonNgu: (params) => {
    return axiosWrapper.patch(`/updateNgonNgu/${params?._id}`, {
      ...params,
    });
  },

  deleteNgonNgu: (params) => {
    return axiosWrapper.delete(`/deleteNgonNgu/${params?._id}`, {
      ...params,
    });
  },
};
