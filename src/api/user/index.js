import axiosWrapper from "../../services/jwtServices/jwtServices";

export default {
  userLogin: (params) => {
    return axiosWrapper.post(`/login`, {
      ...params,
    });
  },

  getAccountByID: (params) => {
    return axiosWrapper.get(`/getAccountByID/${params}`);
  },

  adminLogin: (params) => {
    return axiosWrapper.post(`/login-admin`, {
      ...params,
    });
  },

  userRegister: (params) => {
    return axiosWrapper.post(`/create-taiKhoan`, {
      ...params,
    });
  },

  updateTaiKhoan: (params) => {
    return axiosWrapper.patch(`/updateTaiKhoan`, {
      ...params,
    });
  },

  getPasswordByEmail: (params) => {
    return axiosWrapper.post(`/getPasswordByEmail`, {
      ...params,
    });
  },

  changePassword: (params) => {
    return axiosWrapper.post(`/changePassword`, {
      ...params,
    });
  },

  getAllTaiKhoan: (params) => {
    return axiosWrapper.get(`/getAllTaiKhoan`, {
      ...params,
    });
  },

  getTaiKhoanByField: (params) => {
    return axiosWrapper.post(`/getTaiKhoanByField`, {
      ...params,
    });
  },

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
