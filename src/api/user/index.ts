import axios from "../myAxios";
const userList = (
  params: {
    username?: string;
    nickname?: string;
    p: number;
    ps: number;
    sort?: string;
  },
  option = {}
) =>
  axios({
    method: "GET",
    url: "/user/query",
    params,
    ...option,
  });
const userInfoEdit = (
  data: {
    id: number;
    password?: string;
    nickname?: string;
    status?: number;
    brandAuthority?: string;
    auditAuthority?: string;
    overviewAuthority?: string;
    systemAuthority?: string;
  },
  option = {}
) =>
  axios({
    method: "POST",
    url: "/user/update",
    data,
    ...option,
  });
export {
  userList,
  userInfoEdit,
};
