import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllTacGia: (params) => {
    return axiosWrapper.get(`/getAllTacGia`, {
      ...params,
    });
  },

  createTacGia: (params) => {
    return axiosWrapper.post(`/createTacGia`, {
      ...params,
    });
  },

  getTacGiaByID: (params) => {
    return axiosWrapper.get(`/getTacGiaByID/${params?.data}`, {
      ...params,
    });
  },

  updateTacGia: (params) => {
    return axiosWrapper.patch(`/updateTacGia/${params?._id}`, {
      ...params,
    });
  },

  deleteTacGia: (params) => {
    return axiosWrapper.delete(`/deleteTacGia/${params?._id}`, {
      ...params,
    });
  },
};
