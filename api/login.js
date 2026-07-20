import myHttp from "@/utils/request";
//登录相关api
const login = {
  //微信授权获取openid
  getOpenId(data) {
    return myHttp({
      url: `/wechat/mini/getOpenId`,
      method: "POST",
      data: data,
    });
  },

  //微信授权获取手机号
  getPhoneNumber(data) {
    return myHttp({
      url: `/wechat/mini/getPhoneNumber`,
      method: "POST",
      data: data,
    });
  },

  //微信绑定手机号接口
  userBind(data) {
    return myHttp({
      url: `/wechat/consumer/bind`,
      method: "POST",
      data: data,
    });
  },

  //登录
  codeLogin(data) {
    return myHttp({
      url: `/wechat/consumer/login`,
      method: "POST",
      data: data,
    });
  },

};
export default login;
