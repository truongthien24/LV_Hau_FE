import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllDanhGia: (params) => {
    return axiosWrapper.get(`/getAllDanhGia`, {
      ...params,
    });
  },

  findDanhGia: (params) => {
    return axiosWrapper.post(`/findDanhGia`, {
      ...params,
    });
  },

  createDanhGia: (params) => {
    return axiosWrapper.post(`/createDanhGia`, {
      ...params,
    });
  },

  getDanhGiaByID: (params) => {
    return axiosWrapper.post(`/getDanhGiaById`, {
      ...params,
    });
  },

  updateDanhGia: (params) => {
    return axiosWrapper.patch(`/updateDanhGia/${params?._id}`, {
      ...params,
    });
  },

  deleteDanhGia: (params) => {
    console.log("params", params);
    return axiosWrapper.delete(`/deleteDanhGia/${params?._id}`, {
      ...params,
    });
  },
};
