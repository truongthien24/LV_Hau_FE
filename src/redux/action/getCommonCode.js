import axios from "axios";
import { toast } from "react-hot-toast";
import axiosWrapper from "services/jwtServices/jwtServices";

export const getCommonCode = (name) => async (dispatch) => {
  try {
    let routerCommonCode = "";
    switch (name) {
      case "tacGia": {
        routerCommonCode = "/getAllTacGia";
        break;
      }
      case "theLoai": {
        routerCommonCode = "/getAllTheLoai";
        break;
      }
      case "nhaXuatBan": {
        routerCommonCode = "/getAllNhaXuatBan";
        break;
      }
      case "nhaCungCap": {
        routerCommonCode = "/getAllNhaCungCap";
        break;
      }
      case "ngonNgu": {
        routerCommonCode = "/getAllNgonNgu";
        break;
      }
      case "giamGia": {
        routerCommonCode = "/getAllGiamGia";
        break;
      }
      default:
        break;
    }
    const result = await axiosWrapper.get(routerCommonCode);
    dispatch({
      type: "GET_COMMONCODE",
      payload: {
        Data: result?.data?.data,
        name,
      },
    });
  } catch (error) {
    toast.error(error);
  }
};
