<template>
	<view class="page">
		<view class="header-bar">
			<text class="header-title">我的调解工单</text>
			<text class="header-count">共 {{ workListTotal }} 件</text>
		</view>

		<view v-if="workList.length === 0 && !loading" class="empty">
			<text class="empty-icon">—</text>
			<text class="empty-text">暂无相关调解工单</text>
		</view>

		<view
			v-for="item in workList"
			:key="item.workOrderId"
			class="order-card"
			@tap="goDetail(item.workOrderId)"
		>
			<view class="card-top">
				<text class="order-title">案件编号：{{ item.workOrderId }}</text>
				<view class="status-badge">
					{{ statusList.get(item.status) || '未知状态' }}
				</view>
			</view>
			<view class="card-info">
				<text class="info-line">机构名称：{{ item.deptName || '-' }}</text>
				<text class="info-line">案件日期：{{ formatDate(item.disputeDate) }}</text>
			</view>
			<view class="card-footer">
				<text class="footer-hint">点击查看调解进度 ›</text>
			</view>
		</view>

		<view v-if="workList.length > 0" class="load-more">
			<text v-if="loadingMore">正在加载...</text>
			<text v-else-if="!hasMore">- 没有更多了 -</text>
			<text v-else>上拉加载更多</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			workListData: {
				pageSize: 10,
				pageNum: 1,
				orderByColumn: 'createTime',
				isAsc: 'desc'
			},
			workList: [],
			workListTotal: 0,
			statusList: new Map(),
			loading: false,
			loadingMore: false,
			hasMore: true
		}
	},
	onLoad() {
		this.getstatus()
		this.getProgressQueryList()
	},
	onPullDownRefresh() {
		this.refreshProgressQueryList()
	},
	onReachBottom() {
		this.loadMoreData()
	},
	methods: {
		formatDate(dateStr) {
			if (!dateStr) return '-'
			return dateStr.split(' ')[0]
		},
		goDetail(id) {
			uni.navigateTo({ url: '/pages/consumer/workDetail?id=' + id })
		},
		refreshProgressQueryList() {
			this.workListData.pageNum = 1
			this.hasMore = true
			this.getProgressQueryList()
		},
		loadMoreData() {
			if (this.loadingMore || !this.hasMore) return
			this.loadingMore = true
			this.workListData.pageNum++
			this.getProgressQueryList()
		},
		getstatus() {
			this.$api.main.getDeptType('dm_status').then(res => {
				res.data.forEach(dataRes => {
					this.statusList.set(dataRes.dictValue, dataRes.dictLabel)
				})
			}).catch(err => {
				console.error('获取工单状态字典失败:', err)
			})
		},
		getProgressQueryList() {
			if (this.workListData.pageNum === 1) {
				this.loading = true
				uni.showLoading({ title: '加载中' })
			}

			this.$api.main.getDisputeMediationList(this.workListData).then(res => {
				this.workListTotal = res.total || 0

				if (this.workListData.pageNum === 1) {
					this.workList = res.rows || []
				} else {
					this.workList = this.workList.concat(res.rows || [])
				}

				this.hasMore = this.workList.length < this.workListTotal
				this.loadingMore = false
				this.loading = false

				if (this.workListData.pageNum === 1) {
					uni.hideLoading()
				}
				uni.stopPullDownRefresh()
			}).catch((err) => {
				if (err.data && err.data.code == 401) {
					uni.clearStorageSync()
					uni.showToast({ title: '请重新登录', icon: 'none' })
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/login/login' })
					}, 1500)
				}

				this.loadingMore = false
				this.loading = false

				if (this.workListData.pageNum === 1) {
					uni.hideLoading()
				}
				uni.stopPullDownRefresh()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #F0F4F8;
	padding: 24rpx 28rpx;
}

.header-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
	padding: 0 4rpx;

	.header-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #1A1A2E;
	}

	.header-count {
		font-size: 24rpx;
		color: #9CA3AF;
	}
}

.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 120rpx 0;

	.empty-icon {
		font-size: 64rpx;
		color: #C0C4CC;
		margin-bottom: 16rpx;
	}

	.empty-text {
		font-size: 28rpx;
		color: #9CA3AF;
	}
}

.order-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 32rpx;
	margin-bottom: 20rpx;
	position: relative;
	overflow: hidden;
	box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.04);

	&:active {
		opacity: 0.92;
	}
}

.card-top {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20rpx;
}

.order-title {
	flex: 1;
	font-size: 28rpx;
	font-weight: 600;
	color: #004FCE;
	margin-right: 16rpx;
	line-height: 1.4;
}

.status-badge {
	flex-shrink: 0;
	font-size: 22rpx;
	padding: 6rpx 16rpx;
	border-radius: 8rpx;
	background: rgba(0, 79, 206, 0.1);
	color: #004FCE;
}

.card-info {
	.info-line {
		display: block;
		font-size: 26rpx;
		color: #6B7280;
		line-height: 2;
	}
}

.card-footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 16rpx;
	padding-top: 16rpx;
	border-top: 1rpx solid #F3F4F6;

	.footer-hint {
		font-size: 24rpx;
		color: #004FCE;
		margin-right: 4rpx;
	}
}

.load-more {
	text-align: center;
	padding: 20rpx;
	color: #999;
	font-size: 24rpx;
}
</style>
