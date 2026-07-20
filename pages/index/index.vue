<template>
	<view class="content">
		<view class="background">
			<image style="width: 100%; height: 280rpx;"
				src="@/static/image/addcb8e4126cddfc82432d88c056e6bebeffeb1b669677-a9Jcfr.png"></image>
			<image class="title" src="@/static/image/消保同心 一路同行.png"></image>
		</view>
		<view class="icon">
			<view style="display: flex; align-items: center; justify-content:space-between;width: 100%;">
				<view style="display: flex; align-items: center;">
					<image style="width: 40rpx; height: 40rpx; margin-right: 10rpx;" src="@/static/image/案件审核 1.png">
					</image>
					<text>案件</text>
				</view>
				<view style="display: flex; align-items: center;" v-if="isLogin">
					<text style="color: #004fce;" @click="outLogin">退出登录</text>
				</view>
			</view>
		</view>
		<view v-if="!isLogin" class="login-empty-wrap">
			<view class="login-empty-card">
				<view class="empty-icon-wrap">
					<text class="empty-icon-text">登</text>
				</view>
				<text class="empty-title">尚未登录</text>
				<text class="empty-desc">登录后可查看案件工单及调解进度</text>
				<view class="login-btn" @tap="goToLogin">
					<text>请先登录 ›</text>
				</view>
			</view>
		</view>
		<view v-if="isLogin" class="item" v-for="(item, index) in workList" :key="index">
			<view style="color: #004fce;">案件编号：{{ item.workOrderId }}</view>
			<view style=" margin-top: 10rpx;" v-if="userType === 'consumer'">机构名称：{{ item.deptName }}</view>
			<view style=" margin-top: 10rpx;" v-if="userType === 'institution'">消费者姓名：{{ item.name }}</view>
			<view style=" margin-top: 10rpx;" v-if="userType === 'mediator'">机构名称：{{ item.deptName }}</view>
			<view style=" margin-top: 10rpx;" v-if="userType === 'mediator'">消费者姓名：{{ item.name }}</view>
			<view style=" margin-top: 10rpx;">工单状态：{{ statusList.get(item.status) || '未知状态' }}</view>
			<view style="display: flex; justify-content: space-between; align-items: center; margin-top: 10rpx;">
				<text>案件日期：{{ item.disputeDate ? item.disputeDate.split(" ")[0] : '-' }}</text>
				<view class="detailBtn" @tap="toDetail(item.workOrderId)">查看详情 ›</view>
			</view>
		</view>
		<view v-if="isLogin && workList.length == 0" style="text-align: center;margin-top: 40px;">
			- 暂无工单 -
		</view>

		<!-- 加载更多提示 -->
		<view v-if="isLogin && workList.length > 0" style="text-align: center; padding: 20rpx; color: #999;">
			<view v-if="loadingMore">正在加载...</view>
			<view v-else-if="!hasMore">- 没有更多了 -</view>
			<view v-else>上拉加载更多</view>
		</view>
	</view>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth'
import { resolveLaunchPage } from '@/utils/launchRoute.js'
export default {
	data() {
		return {
			workListData: {
				pageSize: 10,
				pageNum: 1,
				orderByColumn: "createTime",
				isAsc: "desc"
			},//工单查询参数
			workListTotal: 0,//工单总数
			isLogin: false,//是否登录
			loadingMore: false,//是否正在加载更多
			hasMore: true,//是否还有更多数据
			userType: 'consumer',//用户类型：consumer-消费者, institution-机构, mediator-调解员
			workList: [
				{
					disputeDate: '',//纠纷发生日期
					deptName: '',//机构名称
					workOrderId: '',//工单编号
					status: '',//工单状态
				}
			],//工单列表
			statusList: new Map(),//工单状态字典表

		}
	},
	onLoad() {
		const target = resolveLaunchPage()
		if (target === '/pages/consumer/home') {
			uni.reLaunch({ url: target })
		}
	},
	created() {
		// 检查登录状态 - 支持微信登录和PC登录两种方式
		const hasWechatLogin = uni.getStorageSync("userOpenId") && uni.getStorageSync("userPhone");
		const hasTokenLogin = getToken();

		if (hasWechatLogin || hasTokenLogin) {
			this.isLogin = true
			this.checkUserType() // 检查用户类型
			this.getstatus() // 获取工单状态字典
			this.getProgressQueryList()
		} else {
			this.getOpenIdLogin()
		}

	},
	// 下拉刷新
	onPullDownRefresh() {
		this.refreshProgressQueryList();
	},
	// 上拉加载更多
	onReachBottom() {
		this.loadMoreData();
	},
	methods: {
		// 检查用户类型
		checkUserType() {
			const userInfo = uni.getStorageSync('userInfo');
			const hasToken = getToken();
			
			// 如果有token说明是PC登录的用户，需要判断是调解员还是机构
			if (hasToken && userInfo) {
				if (userInfo.isDMMediator) {
					this.userType = 'mediator'; // 调解员
				} else if (userInfo.isDMInstitution) {
					this.userType = 'institution'; // 机构用户
				} else {
					this.userType = 'consumer'; // 消费者
				}
			} else {
				// 微信登录的用户都是消费者
				this.userType = 'consumer';
			}
			
			console.log('用户类型检查结果:', this.userType, userInfo);
		},
		outLogin() {
			uni.clearStorageSync();
			removeToken();
			this.isLogin = false;
			// uni.removeStorageSync('userInfo');
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		goToLogin() {
			uni.removeStorageSync('userStateOK');
			uni.redirectTo({
				url: '/pages/login/login'
			})
		},
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/detail/detail?id=' + id
			})
		},

		//静默登录
		getOpenIdLogin() {
			let that = this
			wx.login({
				success(res) {
					if (res.code) {
						let data1 = { code: res.code }
						that.$api.login.getOpenId(data1).then(res => {
							uni.setStorageSync('userOpenId', res.data.openid);
							that.$api.login.codeLogin().then(resLogin => {
								if (resLogin.code == 200) {
									uni.setStorageSync('userPhone', resLogin.data.phone);
									if (uni.getStorageSync("userOut") == '退出') {
										that.isLogin = false;
										return;
									}
									if (!resLogin.data.phone) {
										that.isLogin = false;
									} else {
										that.isLogin = true;
										that.checkUserType()
										that.getstatus()
										that.getProgressQueryList()
									}
								}
							}).catch(() => {
								that.isLogin = false;
							})
						}).catch(() => {
							that.isLogin = false;
						})
					}
				}
			})
		},
		//刷新
		refreshProgressQueryList() {
			this.workListData.pageNum = 1
			this.hasMore = true
			this.getProgressQueryList()
		},
		//加载更多
		loadMoreData() {
			if (this.loadingMore || !this.hasMore) return
			this.loadingMore = true
			this.workListData.pageNum++
			this.getProgressQueryList()
		},
		//获取工单状态字典
		getstatus() {
			const hasToken = getToken();
			// 根据登录方式调用不同的接口
			const apiCall = hasToken
				? this.$api.orgApi.getDeptType('dm_status')  // 有token调用机构接口
				: this.$api.main.getDeptType('dm_status');   // 无token调用微信接口

			apiCall.then(res => {
				res.data.forEach(dataRes => {
					this.statusList.set(dataRes.dictValue, dataRes.dictLabel);
				})
			}).catch(err => {
				console.error('获取工单状态字典失败:', err);
			})
		},
		//获取用户工单
		getProgressQueryList() {
			// 第一页显示loading，其他页不显示
			if (this.workListData.pageNum === 1) {
				uni.showLoading({
					title: '加载中'
				});
			}

			// 根据登录方式调用不同的接口
			const hasToken = getToken();
			const apiCall = hasToken
				? this.$api.orgApi.getDisputeMediationListByOrg(this.workListData)  // 有token调用机构接口
				: this.$api.main.getDisputeMediationList(this.workListData);       // 无token调用微信接口

			apiCall.then(res => {
				this.nowTitle = "- 暂无投诉 -"

				// 设置总数
				this.workListTotal = res.total || 0;

				if (this.workListData.pageNum === 1) {
					// 第一页，直接赋值
					this.workList = res.rows || [];
				} else {
					// 不是第一页，拼接数据
					this.workList = this.workList.concat(res.rows || []);
				}

				// 判断是否还有更多数据
				this.hasMore = this.workList.length < this.workListTotal;

				// 重置加载更多状态
				this.loadingMore = false;

				if (this.workListData.pageNum === 1) {
					uni.hideLoading();
				}
				uni.stopPullDownRefresh();
			}).catch((err) => {
				if (err.data && err.data.code == 401) {
					// 清除所有登录状态
					uni.clearStorageSync();
					removeToken();
					this.isLogin = false;
				}

				// 重置加载更多状态
				this.loadingMore = false;

				if (this.workListData.pageNum === 1) {
					uni.hideLoading();
				}
				uni.stopPullDownRefresh();
			})
		},
		//投诉详情
		progressQuery(id) {
			uni.navigateTo({
				url: '/pages/progressQuery/progressQuery?id=' + id
			})
		},
	}
}
</script>

<style lang="scss">
.content {
	padding: 0 20rpx;

	.background {
		position: relative;

		.title {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 464rpx;
			height: 66rpx;
		}
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 0 14rpx 0;
	}

	.login-empty-wrap {
		padding: 0;
		margin: 0;
		background: transparent;
		border: none;
		line-height: normal;

		&::after {
			border: none;
		}
	}

	.login-empty-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		border-radius: 24rpx;
		padding: 64rpx 48rpx 56rpx;
		margin: 40rpx 12rpx 0;
		box-shadow: 0 8rpx 32rpx rgba(0, 79, 206, 0.08);
	}

	.empty-icon-wrap {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(0, 79, 206, 0.1), rgba(0, 127, 255, 0.15));
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 32rpx;
	}

	.empty-icon-text {
		font-size: 44rpx;
		font-weight: 700;
		color: #004FCE;
	}

	.empty-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #1A1A2E;
		margin-bottom: 12rpx;
	}

	.empty-desc {
		font-size: 26rpx;
		color: #9CA3AF;
		margin-bottom: 48rpx;
		text-align: center;
		line-height: 1.6;
	}

	.login-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 88rpx;
		background: linear-gradient(135deg, #004FCE, #007FFF);
		border-radius: 44rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: 500;
		box-shadow: 0 8rpx 24rpx rgba(0, 79, 206, 0.25);
	}

	.item {
		background-color: white;
		border-radius: 10rpx;
		margin-bottom: 14rpx;
		padding: 20rpx 30rpx;

		.detailBtn {
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			background-color: #004fce;
			width: 182rpx;
			height: 64rpx;
			border-radius: 12rpx;
		}
	}
}
</style>