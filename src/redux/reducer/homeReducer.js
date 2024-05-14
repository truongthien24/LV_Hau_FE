let initialValue = {
  statusLoading: false,
  statusConfirm: {
    status: false,
    method: () => {},
  },
  userInfo: {},
};

export const homeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "IS-LOADING": {
      const a = true;
      state.statusLoading = a;
      return { ...state };
    }
    case "DONE-LOADING": {
      const a = false;
      state.statusLoading = a;
      return { ...state.statusLoading };
    }
    case "OPEN-CONFIRM": {
      // const a = true;
      state.statusConfirm = {
        status: true,
        method: action.payload,
      };
      // state.statusConfirm.method = action.payload;
      return { ...state };
    }
    case "CLOSE-CONFIRM": {
      const a = false;
      state.statusConfirm.status = a;
      state.statusConfirm.method = () => {};
      return { ...state };
    }
    case "SET-USER-INFO": {
      state.userInfo = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
