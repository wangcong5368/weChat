import myHttp from '@/utils/request'
//纠纷业务api
const main = {
	//纠纷业务列表
	getDisputeMediationList(data) {
	   return myHttp({
	     url: '/wechat/disputeMediation/list',
	     method: 'GET',
		data:data
	   })
	},
	
	//纠纷业务详情
	getDisputeMediation(id) {
	   return myHttp({
	     url: `/wechat/disputeMediation/${id}`,
	     method: 'GET',
	   })
	},
	
	//获取字段
	getDeptType(name) {
	   return myHttp({
	     url: `/wechat/dict/${name}`,
	     method: 'GET',
	   })
	},
	
}
export default main