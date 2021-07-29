import {
  UPDATE_TOKEN,
  UPDATE_USERINFO,
  SET_BRAND_DATA,
  ADD_TRESS_DATA,
} from "./type";
import { Dispatch } from "redux";
const updateToken = (data: string) => ({ type: UPDATE_TOKEN, data });
const updateUserInfo = (data: string) => ({ type: UPDATE_USERINFO, data });
const setBrandData = (data: { name: string; id: number }[]) => ({
  type: SET_BRAND_DATA,
  data,
});
const addTressData = (data: { pathName: string; aut: any }[]) => ({
  type: ADD_TRESS_DATA,
  data,
});

const asyncSetBrandData = () => {
  return async (dispatch: Dispatch) => {
  //  const data: any = await userAddBrand();
    const data: any = []
    dispatch(setBrandData(data));
  };
};
export { updateToken, updateUserInfo, asyncSetBrandData, addTressData };
