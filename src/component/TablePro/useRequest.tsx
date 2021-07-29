import { useCallback, useEffect, useRef, useState } from "react";
import { IUseRequestResult, IInfo, IRequestApi, stateProps } from "./typing";
import useUnComponent from "src/component/hooks/useUnComponent";
const useRequest = (
  request: IRequestApi,
  state: stateProps
): IUseRequestResult => {
  const [info, setInfo] = useState<IInfo>({
    size: 20,
    page: 1,
    sorter: undefined,
  });
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const loadingNum = useRef(0);
  const UnComponent = useUnComponent();
  const getDataList = useCallback(() => {
    setLoadingList(true);
    loadingNum.current++;
    const nowLoadingNum = loadingNum.current;
    request &&
      request(info, state)
        .then((res) => {
          if (loadingNum.current !== nowLoadingNum || UnComponent.current) {
            return;
          }
          setDataList(res.list);
          setTotal(res.total);
          setLoadingList(false);
          loadingNum.current--;
        })
        .catch(() => {
          if (loadingNum.current !== nowLoadingNum || UnComponent.current) {
            return;
          }
          setLoadingList(false);
          loadingNum.current--;
        });
  }, [request, info, UnComponent, state]);
  const handleTableSorter = (pagination: any, filters: any, sorter: any) => {
    setInfo((value) => ({
      ...value,
      sorter: { field: sorter.field, order: sorter.order },
    }));
  };
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  return {
    info,
    setInfo,
    total,
    dataList,
    loadingList,
    setDataList,
    getDataList,
    handleTableSorter,
  };
};

export default useRequest;
