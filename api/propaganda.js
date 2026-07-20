import myHttp from '@/utils/request'
//宣教接口api
const propaganda = {
	//系统用户登录
	getOpenId(data){
		return myHttp({
			url: `/wechat/consumer/sysLogin`,
			method: 'POST',
			data: data
		})
	},
}

export default propaganda