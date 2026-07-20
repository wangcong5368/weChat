// import store from '@/store'
import {
	getToken
} from '@/utils/auth'

import url from '@/utils/requestUrl.js'

import errorCode from '@/utils/errorCode'

import {
	toast,
	showConfirm,
	tansParams
} from '@/utils/common'

let timeout = 30000

const baseUrl = url 
let lock = true
const smCrypto = require('sm-crypto');
const cipherMode = 1 // 0（C1C2C3模式）或1（C1C3C2模式）
// 公钥：04be9267c9db1209f0c534a855e807e881a8f82e340c0cddc679a6aba8a1c870f9bedc434711cac38fd7f5f9e1c72779b304d694f024df49c9658eb00f1e22ea6f
// 私钥：38a5bbed265a2c325cd8d3089bd21f2c13394f14abe515fb419cabd39778ffc2

const request = async config => {
	// request拦截器
  console.log(config,'177777',config.baseUrl,config.data,config.method, uni.getStorageSync('userPhone') ,uni.getStorageSync('userOpenId') )
	// 是否需要设置 token
	// const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	  //测试 加 请求头加 openId
		if (getToken()) {
			config.header['Authorization'] = getToken();
		}else{
			config.header['openId'] = uni.getStorageSync('userOpenId') 
			config.header['phone'] = uni.getStorageSync('userPhone') 
		}
	  // get请求映射params参数
	  if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	  }
	// if ((config.baseUrl!='https://www.smart-kind.com/component') && (config.baseUrl!='https://www.bjbc.net.cn/component')&& config.data && config.method != 'get' &&  config.method != 'put' &&  config.method != 'GET'&&  config.method != 'post') {
	//   // 对 body 参数进行加密，使用 SM2 公钥加密
	//    const requestPublicKey = '044892bd1fa32451551a8814dddf85cfa77364a1e57555c796fa381cb81b747c505f453bd44a2f958a15415944e4989d2256d171bb3ddd08053427426d8f868cd9'
	//    // const requestPublicKey = '0421a5adc84e23ab6a0dcb59fbf33419d2abaa9f4dfd192ebde40169f14f5dc2ca0c46c7eedbe1357c6c20c76bfb3de17f86dce239bf043d71ce04749b0e1286ea'
	//   // const requestPublicKey = "MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAE1IGRsh4LiAJ2rCJ//V0scxK4p7pdOe0BYs+V7N23qGmDC+ql+K7Fbe01kXR4Zuit21kXkVrOBPFamrewOZjW5A==";
	//   console.log("sm2走没走啊！",requestPublicKey,JSON.stringify(config.data), );
	//  // const encryptedData =  sm2Encrypt(JSON.stringify(config.data));
	//   const encryptedData = "04" + smCrypto.sm2.doEncrypt(JSON.stringify(config.data), requestPublicKey, cipherMode) 
	//   // const responsePrivateKey = 'c7a7a17bd70955ddfd30f594ebfa0fb14d58a2dc19de1cac577bf006f5fbe623';
	//   // 解密数据
	//   // const decryptedData = smCrypto.sm2.doDecrypt(encryptedData, responsePrivateKey , cipherMode);
	// 	// console.log(encryptedData,"------------------",decryptedData,"encryptedData2777777777777");
		
	//   // 重新构造请求体，使用加密后的数据
	//   const encryptedBody = {
	// 	data: encryptedData // 使用 SM2 加密后的字符串
	// 	// 可能需要保留原来的其它请求参数，例如 config.data 中的其它属性
	//   };
  
	//   // 更新 config 的 data 为加密后的数据对象
	//   config.data = encryptedBody;
	// }
	// uni.showLoading({
	// 	title: '加载中...'
	// })
      
	return new Promise((resolve, reject) => {
		uni.request({
          method: config.method || 'get',
          timeout: config.timeout ||  timeout,
          url: (config.baseUrl ||  baseUrl)  + config.url,
          data: config.data,
          header: config.header,
          dataType: 'json'
			}).then(response => {
				const err = response[0]
				const res = response[1]
				if (err || !res) {
					reject(err || new Error('请求失败'))
					return
				}
				if (!res.data) {
					reject(new Error('响应数据为空'))
					return
				}
				console.log(res, "responseresponse");
				const code = res.data.code
				
				if (code !== 200 && code !== undefined) {
					let msg = res.data.msg || res.data.errMsg || '请求失败(' + code + ')'
					toast(msg)
					reject(res)
					return
				}
				resolve(res.data)
			}).catch(error => {
				console.log(error,'80888')
				let message = (error && error.message) || '请求失败'
				if (message === 'Network Error') {
					message = '后端接口连接异常'
				} else if (message.includes('timeout')) {
					message = '系统接口请求超时'
				} else if (message.includes('Request failed with status code')) {
					message = '系统接口' + message.substr(message.length - 3) + '异常'
				}
				reject(error)
			})
	})
}

export default request