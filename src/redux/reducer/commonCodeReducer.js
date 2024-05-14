const initialValue = {
  theLoai: [],
  tacGia: [],
  nhaXuatBan: [],
  nhaCungCap: [],
  ngonNgu: [],
  giamGia: [],
};

export const CommonCodeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_COMMONCODE": {
      switch (action.payload.name) {
        case "theLoai": {
          state.theLoai = action.payload.Data;
          return { ...state };
        }
        case "tacGia": {
          state.tacGia = action.payload.Data;
          return { ...state };
        }
        case "nhaXuatBan": {
          state.nhaXuatBan = action.payload.Data;
          return { ...state };
        }
        case "nhaCungCap": {
          state.nhaCungCap = action.payload.Data;
          return { ...state };
        }
        case "ngonNgu": {
          state.ngonNgu = action.payload.Data;
          return { ...state };
        }
        case "giamGia": {
          state.giamGia = action.payload.Data;
          return { ...state };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
