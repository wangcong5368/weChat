<!-- 登入 -->
<template>
	<view class="warp">
		<image style="position: absolute;top: 0;width: 100vw;height: auto;" src="@/static/image/backgroundHead.png"
			mode="widthFix"></image>
		<!-- 登入 -->
		<view class="content">
			<image style="width: 250rpx;height: auto;margin-top: 300rpx;" src="@/static/image/logo.png" mode="widthFix">
			</image>
			<p style="color: #161616;font-size: 40rpx; font-weight: bold;">天津众和金融消保平台</p>
			<view class="" style="text-align: center;" v-if="!isLogin">
				<button class="login-button" style="margin-top: 80rpx;" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">消费者登录</button>
				<button class="login-button login-button-outline" style="margin-top: 40rpx;" @click="goLogin">调解员登录</button>
				<button class="login-button login-button-outline" style="margin-top: 24rpx;" @click="goLogin">机构用户登录</button>
			</view>
			<view class="" v-if="isLogin" style="margin-top: 122rpx;">
				<view class="" style="display: flex; justify-content: space-between;align-items: center;">

					账号：<u--input style="background-color: #FFFFFF;width: 70%;" type="text" v-model="loginForm.username"
						placeholder="账号" />
				</view>
				<view class=""
					style="display: flex; justify-content: space-between;margin-top: 20px;align-items: center;">
					密码：<u--input style="background-color: #FFFFFF;width: 70%;" type="text" v-model="loginForm.password"
						password placeholder="密码" />
				</view>

				<view class="" style="display: flex;margin-top: 20px;justify-content: center;">
					<!-- <button class="login-button-small" @click="isLogin = false">返回 </button> -->
					<button class="login-button-small" @click="goBack">返回 </button>
					<button class="login-button-small" @click="pcUesrLogin"> 登录 </button>
				</view>
			</view>
			<!-- 			<view class="" style="display: flex;align-items: center;margin-top: 140rpx;">
				<view class="" style="width: 204rpx;height: 2px;background-color: #D8D8D8;" />
				<view class="" style="color: #AAAAAA;">
					其它登录方式
				</view>
				<view class="" style="width: 204rpx;height: 2px;background-color: #D8D8D8;" />
			</view>
			<view class="" style="margin-top: 20rpx;">
				<image style="width: 106rpx;height: auto;" src="@/static/image/bottom.png" mode="widthFix"></image>
				<view class="">
					账号登录
				</view>
				
			</view> -->
			<view class="" style="display: flex;margin-top: 140rpx;align-items: center;">
				<view class="checkbox-container" @click="toggleAgreement"
					style="width: 34rpx;height: 34rpx;border-radius: 34rpx;display: flex;align-items: center;justify-content: center;border: 1px solid #999999;">
					<view v-if="isAgreed" class=""
						style="width: 25rpx;height: 25rpx;border-radius: 34rpx;background-color: #007FFF;" />
				</view>
				<span style="color: #898989;font-size: 14px;margin-left: 10rpx;">我已阅读并同意 <span style="color: #007FFF;"
						@click="showServiceAgreement">《天津众和金融消保平台服务协议》</span></span>
			</view>

		</view>

		<view v-if="showAgreementDialog" class="dialog-overlay" @click="closeAgreementDialog">
			<view class="dialog-content" @click.stop>
				<view class="dialog-close" @click="closeAgreementDialog">×</view>

				<view class="dialog-header">
					<text class="dialog-title">用户须知</text>
				</view>
				<scroll-view scroll-y class="dialog-body">
					<view class="agreement-content">
						<text class="agreement-text">
							欢迎阅读天津众和金融消保平台《用户须知》，您使用本平台提供的各项服务须遵循以下条款。
						</text>
						<text class="agreement-text">
							1.用户注册前请仔细阅读，点击“同意”即视为您已阅读、了解并完全同意用户须知的各项内容。作为用户远程数字签名服务的链接，本平台可根据法律法规变化及实际需要及时修改须知内容，并台进行公告。一经公告，立即生效。如您继续使用本平台服务，即视为您已接收修订后的用户须知。
						</text>
						<text class="agreement-text">
							2.为了提供服务，本平台将在法律许可的范围内，按照合理、正当、必要原则，收集、存储并使用您的个人信息，仅用于远程数字签名使用，具体搜集信息详见《隐私政策》。
						</text>
						<text class="agreement-text">
							3.本平台每位用户原则上只允许使用一个平台账户。如有证据证明您存在不当注册或不当使用多个平台账户的情形或利用本平台进行恶意投诉举报、借助投诉或举报进行敲诈勒索、就同一事项多次重复提出投诉或者滥用权利的情形，本平台可以采取关闭账户、删除工单、终止服务等措施。
						</text>
						<text class="agreement-text">
							4.您在投诉举报时，应当遵守宪法法律，遵守公共秩序，尊重社会公德。不得在投诉举报中含有损害国家利益、社会公共利益或者他人合法权益的内容。违法本条规定，平台有权将违法违规线索移交司法机关或监管部门。本平台有权采取删除内容、关闭账户、终止服务等措施。
						</text>
					</view>
				</scroll-view>
				<view class="dialog-footer">
					<button class="agreement-btn" @click="agreeAndClose">我已阅读并同意</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	setToken,
	getToken
} from '@/utils/auth'
import { resolveLaunchPage } from '@/utils/launchRoute.js'
export default {
	data() {
		return {
			isMobile: true,
			srcs: 'https://www.bjbc.net.cn/static/mteh.png', //使用绝对路径，不能用相对路径
			title: 'Hello',
			src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.eSpAhJ8i75zSrfa1cacOQgHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
			text: '无头像',
			oppID: '',
			isLogin: false,
			loginForm: {
				username: "",
				password: "",
				rememberMe: false
			},
			loading: false,
			showLogin: true,//是否允许登录
			isAgreed: false, // 是否同意协议
			showAgreementDialog: false, // 是否显示协议弹窗
		}
	},
	onLoad(options) {
		if (options.pcUser != undefined) {
			this.isLogin = true
			return
		}
		this.isLogin = false
		const target = resolveLaunchPage()
		if (target !== '/pages/login/login') {
			uni.reLaunch({ url: target })
		}
	},
	methods: {
		toggleAgreement() {
			this.isAgreed = !this.isAgreed;
		},
		showServiceAgreement() {
			this.showAgreementDialog = true;
		},
		closeAgreementDialog() {
			this.showAgreementDialog = false;
		},
		agreeAndClose() {
			this.isAgreed = true;
			this.showAgreementDialog = false;
		},
		goBack() {
			if (this.isLogin) {
				this.isLogin = false;
				this.loginForm.username = '';
				this.loginForm.password = '';
				return;
			}
			uni.navigateBack({
				delta: 1
			})
		},
		goHome() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		goLogin() {
			this.isLogin = true;
		},
		pcUesrLogin() {
			// 检查是否同意协议
			if (!this.isAgreed) {
				uni.showToast({
					title: '请先同意服务协议',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			if (this.showLogin) {
				console.log(this.$api.login.login, "login");

				console.log("开始登录");
				this.loading = true;
				this.showLogin = false;

				// 参考web端登录逻辑
				this.$api.orgApi.login(this.loginForm.username, this.loginForm.password).then(res => {
					this.loading = false;
					if (res.code == 500) {
						uni.$u.toast("账号或者密码不正确");
						setTimeout(() => {
							this.showLogin = true;
						}, 500);
					}
					if (res.code == 200) {
						// 保存token
						setToken(res.token);
						this.$api.orgApi.getUserInfo().then(res => {
							console.log(res, "res");
							// 保存用户信息到localStorage
							if (res.user) {
								uni.setStorageSync('userInfo', res.user);

							}
						})

						console.log("登录成功，token已保存:", res.token);

						// 登录成功后直接跳转到首页
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
					console.log(res, this.$utils.state, "登录");
				}).catch(error => {
					this.loading = false;
					console.error("登录失败:", error);
					uni.$u.toast("登录失败，请重试");
					setTimeout(() => {
						this.showLogin = true;
					}, 500);
				});
			}
		},
		getPhoneNumber(e) {
			if (!this.isAgreed) {
				uni.showToast({
					title: '请先同意服务协议',
					icon: 'none',
					duration: 2000
				});
				return;
			}

			if (e.detail.errMsg && e.detail.errMsg !== 'getPhoneNumber:ok') {
				uni.showToast({
					title: '获取手机号失败: ' + e.detail.errMsg,
					icon: 'none',
					duration: 3000
				});
				return;
			}

			if (!e.detail.code) {
				uni.showToast({
					title: '未获取到手机号授权code',
					icon: 'none',
					duration: 3000
				});
				return;
			}

			let that = this
			let data = {
				code: e.detail.code,
			}
			that.$api.login.getPhoneNumber(data).then(r => {
				console.log(r, "getPhoneNumber响应");
				let phone = ''
				if (r.data && r.data.phoneNumber) {
					phone = r.data.phoneNumber;
				} else if (r.phoneNumber) {
					phone = r.phoneNumber;
				} else if (r.data && typeof r.data === 'string') {
					phone = r.data;
				} else {
					console.error('无法解析手机号, 响应结构:', r);
					uni.showToast({
						title: '解析手机号失败，请检查响应格式',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				uni.setStorageSync('userPhone', phone);
				wx.login({
					success(res) {
						if (res.code) {
							let data1 = {
								code: res.code,
							}
							that.$api.login.getOpenId(data1).then(openIdRes => {
								console.log(openIdRes, "getOpenId响应");
								let openId = ''
								if (openIdRes.data && openIdRes.data.openid) {
									openId = openIdRes.data.openid;
								} else if (openIdRes.openid) {
									openId = openIdRes.openid;
								} else if (openIdRes.data && openIdRes.data.openId) {
									openId = openIdRes.data.openId;
								} else {
									console.error('无法解析openId, 响应结构:', openIdRes);
									uni.showToast({
										title: '解析openId失败',
										icon: 'none',
										duration: 3000
									});
									return;
								}
								uni.setStorageSync('userOpenId', openId);
								that.$api.login.userBind({ phone }).then(userBindRes => {
									console.log(userBindRes, "userBind响应");
								})
								that.$api.login.codeLogin({ phone }).then(resLogin => {
									if (resLogin.code == 200) {
										uni.showLoading({
											title: '登录中'
										});
										setTimeout(() => {
											if ((uni.getStorageSync('userOpenId') != '' && uni.getStorageSync('userPhone') != '')) {
												uni.setStorageSync('userStateOK', "登入成功");
												uni.redirectTo({
													url: '/pages/consumer/home'
												})
											}
										}, 1000);
									} else {
										uni.showToast({
											title: '登录失败: ' + (resLogin.msg || '未知错误'),
											icon: 'none',
											duration: 3000
										});
									}
								}).catch((err) => {
									let msg = (err && (err.msg || err.message || err.errMsg)) || 'codeLogin请求失败'
									uni.showToast({ title: msg, icon: 'none', duration: 3000 })
								})
							}).catch(err => {
								let msg = (err && (err.msg || err.message || err.errMsg)) || '获取OpenId失败'
								uni.showToast({ title: msg, icon: 'none', duration: 3000 })
							})
						} else {
							uni.showToast({
								title: 'wx.login获取code失败',
								icon: 'none',
								duration: 3000
							});
						}
					},
					fail(err) {
						uni.showToast({
							title: 'wx.login调用失败: ' + (err.errMsg || ''),
							icon: 'none',
							duration: 3000
						});
					}
				})
				this.isMobile = false;
			}).catch(errRes => {
				let msg = (errRes && (errRes.msg || errRes.message || errRes.errMsg)) || '获取手机号接口请求失败'
				if (errRes && errRes.data && errRes.data.msg) {
					msg = errRes.data.msg
				}
				uni.showToast({
					title: msg,
					icon: "none",
					duration: 3000
				})
			})
		},

	}
}
</script>

<style lang="scss" scoped>
.warp {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: #e9e9e9;
	// background: linear-gradient(to bottom, #E5E5E5, #F6F6F6);
	background-size: 100% 100%;
}

.content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
}

.checkbox-container {
	cursor: pointer;
	transition: all 0.3s ease;
}


.login-button {
	background-color: #007FFF;
	width: 50vw;
	height: calc(75vw * 59/306);
	border-radius: 42.5px;
	color: #FFF;
	font-size: 28rpx;
	text-align: center;
	line-height: calc(75vw *59/306);
}

.login-button-outline {
	background-color: #fff;
	color: #007FFF;
	border: 2rpx solid #007FFF;
	box-sizing: border-box;
}

// .login-button{
// 	background: no-repeat url('https://www.bjbc.net.cn/static/buttonLogin.png');
// 	background-size: 100% 100%;
// 	width: 75vw;
// 	height: calc(75vw *93/564);
// 	border-radius: 5px;
// 	color: #FFF;
// 	font-size: 28rpx;
// 	text-align: center;
// 	line-height: calc(75vw *93/564);
// }

.login-button-small {
	background: no-repeat url('https://www.bjbc.net.cn/static/buttonLogin.png');
	background-size: 100% 100%;
	width: 30vw;
	height: 70rpx;
	border-radius: 60px;
	color: #FFF;
	font-size: 28rpx;
	text-align: center;
	line-height: 70rpx;
	margin: 20rpx;
}

button::after {
	border: none;
}


/* 弹窗样式 */
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40rpx;
	box-sizing: border-box;
}

.dialog-content {
	width: 100%;
	max-width: 650rpx;
	max-height: 85vh;
	background-color: white;
	border-radius: 20rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
	position: relative;
}

.dialog-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40rpx 40rpx 30rpx 40rpx;
	border-bottom: none;
	background-color: white;
	position: relative;
}

.dialog-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	flex: 1;
	text-align: center;
}

.dialog-close {
	font-size: 50rpx;
	color: #999;
	cursor: pointer;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 10rpx;
	top: 10rpx;
	border-radius: 50%;
	transition: all 0.3s ease;
	z-index: 999;
}

.dialog-close:active {
	background-color: #f5f5f5;
}

.dialog-body {
	flex: 1;
	max-height: 60vh;
	overflow-y: auto;
}

.agreement-content {
	display: flex;
	flex-direction: column;
	padding: 0 50rpx;
}

.agreement-text {
	line-height: 1.8;
	font-size: 28rpx;
	color: #555;
	text-align: justify;
	margin-bottom: 30rpx;
	padding: 0 10rpx;
	text-indent: 2em;
}

.agreement-text:first-child {
	font-weight: 500;
	color: #333;
	margin-bottom: 40rpx;
}

.dialog-footer {
	padding: 30rpx 40rpx 40rpx 40rpx;
	border-top: none;
	background-color: white;
}

.agreement-btn {
	width: 100%;
	background: linear-gradient(135deg, #007FFF, #0066CC);
	color: white;
	border: none;
	border-radius: 50rpx;
	padding: 28rpx;
	font-size: 32rpx;
	font-weight: bold;
	box-shadow: 0 6rpx 20rpx rgba(0, 127, 255, 0.3);
	transition: all 0.3s ease;
}

.agreement-btn:active {
	transform: translateY(2rpx);
	box-shadow: 0 4rpx 15rpx rgba(0, 127, 255, 0.4);
}

.agreement-btn::after {
	border: none;
}
</style>