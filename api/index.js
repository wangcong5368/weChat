/**
 * api接口的统一出口
 */
import login from './login.js' //登录--api
import main from './main.js' // 首页
import pcInterface from './pcInterface.js' // pc -- api
import propaganda from './propaganda.js' // m -- api
import orgApi from './orgApi.js' // 机构/调解员 -- api

export default {
	login,
	main,
	pcInterface,
	propaganda,
	orgApi
}
