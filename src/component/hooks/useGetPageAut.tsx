import { useAppSelector } from "../../redux/hook";
import { useLocation } from "react-router-dom";

const useGetPageAut = () => {
  const pathName = useLocation().pathname;
  const pagesAut = useAppSelector((state) => state.userTress);
  return pagesAut.find((item) => item.pathName === pathName)!.aut;
};

export default useGetPageAut;
