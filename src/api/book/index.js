import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  getAllSach: (params) => {
    return axiosWrapper.get(`/getAllSach`, {
      ...params,
    });
  },

  findSach: (params) => {
    return axiosWrapper.post(`/findSach`, {
      ...params,
    });
  },

  createSach: (params) => {
    return axiosWrapper.post(`/createSach`, {
      ...params,
    });
  },

  getSachByID: (params) => {
    return axiosWrapper.get(`/getSachByID/${params?.data}`, {
      ...params,
    });
  },

  updateSach: (params) => {
    return axiosWrapper.patch(`/updateSach/${params?._id}`, {
      ...params,
    });
  },

  deleteSach: (params) => {
    console.log('params', params)
    return axiosWrapper.delete(`/deleteSach/${params?._id}`, {
      ...params,
    });
  }

  //   getDataProduction: (params: object) => {
  //     return axiosWrapper.post(`/Production/DataService/GetData`, {
  //       ...params,
  //     });
  //   },
  //   update: (params: object) => {
  //     return axiosWrapper.post(`/Purchasing/DataService/Update`, {
  //       ...params,
  //     });
  //   },
  //   updateProduction: (params: object) => {
  //     return axiosWrapper.post(`/Production/DataService/Update`, {
  //       ...params,
  //     });
  //   },

  //   export: (params: object) => {
  //     return axiosWrapper.post(
  //       `/Production/DataService/Export`,
  //       {
  //         ...params,
  //       },
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //   },
  //   exportReport: (params: object) => {
  //     return axiosWrapper.post(
  //       `/Production/DataService/ExportReport`,
  //       {
  //         ...params,
  //       },
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //   },
};
