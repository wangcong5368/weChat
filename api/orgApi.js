import myHttp from "@/utils/request";
import expandService from "@/utils/expandService";
//纠纷业务api
const orgApi = {
  // 机构/调解员获取纠纷业务列表
  getDisputeMediationListByOrg(data) {
    return myHttp({
      url: "/project/disputeMediation/list",
      method: "GET",
      data: data,
    });
  },
  //   调解员/机构方登录方法
  login(username, password, code, uuid) {
    const data = {
      username,
      password,
      code,
      uuid,
    };
    return myHttp({
      url: "/login",
      headers: {
        isToken: false,
        repeatSubmit: false,
      },
      method: "post",
      data: data,
    });
  },
  //获取字段
  getDeptType(name) {
    return myHttp({
      url: `/system/dict/data/type/${name}`,
      method: "GET",
    });
  },
  //机构/调解员获取纠纷业务详情
  getDisputeMediation(id) {
    return myHttp({
      url: `/project/disputeMediation/${id}`,
      method: "GET",
    });
  },
  //获取纠纷业务扩展信息
  getDisputeMediationExpandInfo(workOrderId) {
    return expandService({
      url: (`/project/disputeMediationExpand/getWorkOrderInfo/${workOrderId}`),
      method: "GET",
    });
  },


  // 获取用户信息
  getUserInfo(data) {
    return myHttp({
      url: `/getInfo`,
      method: "GET",
      data: data,
    });
  },
};
export default orgApi;
