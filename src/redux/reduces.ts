import {
  ADD_TRESS_DATA,
  SET_BRAND_DATA,
  UPDATE_TOKEN,
  UPDATE_USERINFO,
} from "./type";
import { combineReducers } from "redux";
const token = localStorage.getItem("token");
function userInfo(
  state: { token: string; userName: string } = {
    token: token ? JSON.parse(token) : "",
    userName: "",
  },
  action: { type: string; data: any }
) {
  switch (action.type) {
    case UPDATE_TOKEN:
      localStorage.setItem("token", JSON.stringify(action.data));
      return {
        ...state,
        token: action.data,
      };
    case UPDATE_USERINFO:
      return {
        ...state,
        userName: action.data,
      };
    default:
      return state;
  }
}
//完整的品牌数据
function brandData(
  state: { name: string; id: number }[] = [],
  action: { type: string; data: { name: string; id: number }[] }
) {
  switch (action.type) {
    case SET_BRAND_DATA:
      return action.data;
    default:
      return state;
  }
}
function userTress(
  state: { pathName: string; aut: string[] }[] = [],
  action: { type: string; data: { pathName: string; aut: string[] }[] }
) {
  switch (action.type) {
    case ADD_TRESS_DATA:
      return action.data;
    default:
      return state;
  }
}
const rootReducer = combineReducers({ userInfo, brandData, userTress });
export default rootReducer;
