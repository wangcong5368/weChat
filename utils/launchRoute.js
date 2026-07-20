import { getToken } from '@/utils/auth'

const ENTRY_PAGE = '/pages/login/login'

export function resolveLaunchPage() {
	const hasWechatLogin =
		uni.getStorageSync('userOpenId') != '' &&
		uni.getStorageSync('userPhone') != '' &&
		uni.getStorageSync('userStateOK') == '登入成功'
	const hasTokenLogin = getToken() != ''

	if (hasWechatLogin) return '/pages/consumer/home'
	if (hasTokenLogin) return '/pages/index/index'
	return ENTRY_PAGE
}

export function routeOnLaunch() {
	const target = resolveLaunchPage()
	if (target !== ENTRY_PAGE) {
		uni.reLaunch({ url: target })
	}
}
