import { combineReducers } from "redux";
import { AccountReducer } from "./accountReducer";
import { homeReducer } from "./homeReducer";
import { CommonCodeReducer } from "./commonCodeReducer";

const reducers = combineReducers({
    taiKhoan: AccountReducer,
    home: homeReducer,
    commonCode: CommonCodeReducer
})

export default reducers;