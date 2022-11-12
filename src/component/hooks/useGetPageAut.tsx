import { useAppSelector } from "../../redux/hook";
import { useLocation } from "react-router-dom";

const useGetPageAut = () => {
  const pathName = useLocation().pathname;
  const pagesAut = useAppSelector((state) => state.userTress);
  const Tress = pagesAut.find((item) => item.pathName === pathName);
  return Tress ? Tress.aut : [];
};

export default useGetPageAut;
