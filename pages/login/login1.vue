<!-- 登入 -->
<template>
	<view class="warp">
		<!-- 登入 -->
		<view class="content">
			<image style="width: 172rpx;height: auto;" src="https://www.bjbc.net.cn/static/240722%E6%96%B0logo.png" mode="widthFix"></image>
			<p style="color: #161616;font-size: 40rpx; margin-top: 62rpx;">北京金融业消保守护服务平台</p>
			<view style="display: flex;color: #006F9E;font-size: 38rpx;  margin-top: 17rpx;">
				<p>消保同心</p>
				<view style="width: 20px;">
					
				</view>
				<p>一路同行</p>
			</view>
<!-- 			<view class="" v-if="!isLogin">
				<button class="login-button" style="margin-top: 122rpx;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">消费者登录 </button>
				<button class="login-button" style="margin-top: 50rpx;" @click="isLogin = true"> 机构用户登录 </button>
			</view> -->
			<view class="" v-if="!isLogin">
				<button class="login-button" style="margin-top: 120rpx;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">消费者登录 </button>
			</view>
			<view class=""  v-if="isLogin" style="margin-top: 122rpx;">
				<view class="" style="display: flex; justify-content: space-between;align-items: center;">

					账号：<u--input style="background-color: #FFFFFF;width: 70%;" type="text" v-model="loginForm.username" placeholder="账号" />
				</view>
				<view class="" style="display: flex; justify-content: space-between;margin-top: 20px;align-items: center;">
					密码：<u--input  style="background-color: #FFFFFF;width: 70%;"  type="text" v-model="loginForm.password" password placeholder="密码" />
				</view>
				<view class="" style="display: flex; justify-content: space-between;margin-top: 20px;align-items: center;">
					验证码：<u--input  customStyle="width: 30vw;margin:0px 20rpx"  type="text" v-model="loginForm.code" placeholder="验证码" />
					<image @click="getCode" :src="codeUrl" mode="widthFix" style="width: 200rpx; height: auto;"></image>
				</view>
				<view class="" style="display: flex;margin-top: 20px;justify-content: center;">
					<!-- <button class="login-button-small" @click="isLogin = false">返回 </button> -->
					<button class="login-button-small" @click="goBack">返回 </button>
					<button class="login-button-small" @click="pcUesrLogin"> 登录 </button>
				</view>
				
			</view>
		</view>

		</view>
	</view>
</template>

<script>
	// import {
	// 	setToken
	// } from '@/utils/auth'
	export default {
		data() {
			return {
				isMobile: true,
				srcs: 'https://www.bjbc.net.cn/static/mteh.png', //使用绝对路径，不能用相对路径
				title: 'Hello',
				src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.eSpAhJ8i75zSrfa1cacOQgHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
				text: '无头像',
				oppID: '',
				isLogin:false,
				codeUrl: "",
				loginForm: {
					username: "",
					password: "",
					rememberMe: false,
					code: "",
					uuid: ""
				},
				// 验证码开关
				captchaEnabled: true,
				showLogin:true,//是否允许登录
			}
		},
		created() {
			// if (uni.getStorageSync('userOpenId') != '' && uni.getStorageSync('userPhone') != '' && uni.getStorageSync('userStateOK') == '登入成功' ) {
			// 	uni.switchTab({
			// 		url: '/pages/index/index'
			// 	});
			// }
			// this.getCode() 
		},
		onLoad(options) {
			console.log(options.pcUser,"optionsa?");
			if(options.pcUser != undefined ){
				this.isLogin = true
				this.getCode()
			}else{
				if (uni.getStorageSync('userOpenId') != '' && uni.getStorageSync('userPhone') != '' && uni.getStorageSync('userStateOK') == '登入成功' ) {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			}

		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				})	
			},
			goHome(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			getCode() {
			  this.$api.pcInterface.getCodeImg().then(res => {
				this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
				if (this.captchaEnabled) {
				  this.codeUrl = "data:image/gif;base64," + res.img;
				  this.loginForm.uuid = res.uuid;
				}
			  });
			},
			pcUesrLogin(){
				if(this.showLogin){
					this.showLogin = false
					this.$utils.dispatch("Login", this.loginForm).then(res => {
						if(res.code == 500){s
							this.getCode()
							uni.$u.toast("账号或者密码不正确")
							setTimeout(() =>{
								this.showLogin = true
							},500)
						}
						if(res.code == 200){
							setToken(res.token)
							this.$utils.dispatch("GetInfo").then(res => {
								console.log(res,this.$utils.state,"登录用户信息");
								if (res.code == 200) {
									uni.redirectTo({
										url: '/pages/mainPagePC/mainPagePC'
									})
								}
								
							})
							          
						}
						
						console.log(res,this.$utils.state,"登录");
					}).catch(over =>{
						setTimeout(() =>{
							this.showLogin = true
						},500)
					});
				}
				
			},
			//微信登录流程
			getPhoneNumber(e) {
				let that = this
				if (e.detail.code) {
					let data = {
						projectId: "1754068005301567489",
						code: e.detail.code,
						parametersType: "WechatMini"
					}
					//初始化手机号
					that.$api.login.getPhoneNumber(data).then(r => {
						let obj = JSON.parse(r.data.userInfo);
						uni.setStorageSync('userPhone', obj.mobile);
						///初始化openid
						 wx.login({
							success(res) {
								if (res.code) {
									//发起网络请求
									let data1 = {
											projectId: "1754068005301567489",
											code: res.code,
											parametersType: "WechatMini"
										}
									that.$api.login.getOpenId(data1).then(res =>{
										let obj2 = JSON.parse(res.msg);
										uni.setStorageSync('userOpenId', obj2.openid);
										let phone = obj.mobile;
										that.$api.login.codeLogin({
											phone
										}).then(resLogin => {
											if(resLogin.code == 200){
												uni.showLoading({
													title: '登录中'
												});
												uni.setStorageSync('userStatus', resLogin.data.status);
												console.log("resLogin.data.isRole?",resLogin.data.isRole);
												if(resLogin.data.isRole == 0){
													setTimeout(() =>{
														if (uni.getStorageSync('userOpenId') != '' && uni.getStorageSync('userPhone') != '' ) {
															// uni.setStorageSync('userStateOK', "登入成功");
															uni.redirectTo({
																url: '/pages/rulePage/rulePage?ruleName=用户须知'
															})
														}
													},1000);
													
												}else{
													setTimeout(() =>{
														if (uni.getStorageSync('userOpenId') != '' && uni.getStorageSync('userPhone') != '' ) {
															uni.setStorageSync('userStateOK', "登入成功");
															uni.switchTab({
																url: '/pages/index/index'
															});
														}
													},1000);
												}
											}
											
										}).catch((err) => {
										})
									})
								} else {
								}
							}
						})
						this.isMobile = false;
					}).catch(errRes => {
						uni.showToast({
							title: errRes,
							icon: "error",
							duration: 3000
						})
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>

	.warp{
		width: 100vw;
		height: 100vh;
		background: no-repeat url("https://www.bjbc.net.cn/static/beijing2.png" );
		background-size: 100% 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 85vh;
	}

	
	.login-button{
		
		background: no-repeat url('https://www.bjbc.net.cn/static/buttonLogin.png');
		background-size: 100% 100%;
		width: 75vw;
		height: calc(75vw *93/564);
		border-radius: 5px;
		color: #FFF;
		font-size: 28rpx;
		text-align: center;
		line-height: calc(75vw *93/564);
	}
	
	.login-button-small{
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
	
	button::after{ border: none;} 
	

</style>