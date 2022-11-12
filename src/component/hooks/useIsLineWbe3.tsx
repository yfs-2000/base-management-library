import { useWeb3React } from "@web3-react/core";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { blockLoginShow } from "../../redux/action";
import { useCallback } from "react";
function useIsLine() {
  const { active } = useWeb3React();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userInfo.token);
  const isLineWbe3 = useCallback(() => {
    function openConnectModal() {
      dispatch(blockLoginShow(true));
    }
    if (active && token) {
      return true;
    } else {
      openConnectModal();
      return false;
    }
  }, [dispatch, active, token]);
  return isLineWbe3;
}
export default useIsLine;
