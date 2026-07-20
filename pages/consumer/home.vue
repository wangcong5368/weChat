<template>
	<view class="page">
		<view class="hero">
			<view class="hero-overlay">
				<text class="hero-title-text">消保同心 一路同行</text>
				<text class="hero-sub">天津众和金融消保平台</text>
			</view>
		</view>

		<view class="main">
			<view class="welcome-card">
				<text class="welcome-label">欢迎使用</text>
				<text class="welcome-desc">您可以查询调解案件进度，或浏览平台公开信息</text>
			</view>

			<view class="action-grid">
				<view class="action-card" @tap="goWorkList">
					<view class="action-icon query-icon">
						<text class="icon-text">查</text>
					</view>
					<text class="action-title">我要查询</text>
					<text class="action-hint">查看我的调解工单</text>
				</view>
				<view class="action-card" @tap="goPublic">
					<view class="action-icon public-icon">
						<text class="icon-text">公</text>
					</view>
					<text class="action-title">众和公开</text>
					<text class="action-hint">调解员信息与条例库</text>
				</view>
			</view>
		</view>

		<!-- 公告弹窗 -->
		<view v-if="showNotice" class="modal-mask" @tap.stop>
			<view class="notice-dialog" @tap.stop>
				<view class="notice-header">
					<text class="notice-title">{{ noticeContent.title }}</text>
					<view class="notice-close" @tap="closeNotice">×</view>
				</view>
				<scroll-view scroll-y class="notice-body">
					<view class="notice-body-inner">
						<view v-for="(section, idx) in noticeContent.sections" :key="idx" class="notice-section">
							<text class="section-title">{{ section.title }}</text>
							<text class="section-content">{{ section.content }}</text>
						</view>
					</view>
				</scroll-view>
				<view class="notice-footer">
					<button class="notice-btn" @tap="closeNotice">我已知晓</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { NOTICE_CONTENT } from '@/utils/mockData'

export default {
	data() {
		return {
			showNotice: false,
			noticeContent: NOTICE_CONTENT
		}
	},
	onLoad() {
		this.showNotice = true
	},
	methods: {
		closeNotice() {
			this.showNotice = false
		},
		goWorkList() {
			uni.navigateTo({ url: '/pages/consumer/workList' })
		},
		goPublic() {
			uni.navigateTo({ url: '/pages/consumer/public' })
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #F0F4F8;
}

.hero {
	position: relative;
	height: 320rpx;
	overflow: hidden;
	background: linear-gradient(135deg, #004FCE 0%, #007FFF 60%, #4DA3FF 100%);

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.hero-title-text {
		font-size: 40rpx;
		font-weight: 700;
		color: #fff;
		letter-spacing: 4rpx;
	}

	.hero-sub {
		margin-top: 16rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: 2rpx;
	}
}

.main {
	padding: 32rpx 28rpx;
	margin-top: -40rpx;
	position: relative;
	z-index: 1;
}

.welcome-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 36rpx 32rpx;
	margin-bottom: 28rpx;
	box-shadow: 0 4rpx 24rpx rgba(0, 79, 206, 0.08);

	.welcome-label {
		display: block;
		font-size: 34rpx;
		font-weight: 600;
		color: #1A1A2E;
		margin-bottom: 12rpx;
	}

	.welcome-desc {
		font-size: 26rpx;
		color: #6B7280;
		line-height: 1.6;
	}
}

.action-grid {
	display: flex;
}

.action-card {
	flex: 1;
	background: #fff;
	border-radius: 20rpx;
	padding: 40rpx 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 4rpx 24rpx rgba(0, 79, 206, 0.08);
	margin-right: 24rpx;
}

.action-card:last-child {
	margin-right: 0;
}

.action-icon {
	width: 96rpx;
	height: 96rpx;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
}

.icon-text {
	font-size: 36rpx;
	font-weight: 700;
	color: #004FCE;
}

.query-icon {
	background: rgba(0, 79, 206, 0.1);
}

.public-icon {
	background: rgba(0, 127, 255, 0.1);
}

.action-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #1A1A2E;
	margin-bottom: 8rpx;
}

.action-hint {
	font-size: 22rpx;
	color: #9CA3AF;
	text-align: center;
}

.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.55);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40rpx;
}

.notice-dialog {
	width: 100%;
	max-height: 80vh;
	background: #fff;
	border-radius: 24rpx;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
}

.notice-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 36rpx 32rpx 24rpx;
	position: relative;
	border-bottom: 1rpx solid #F0F0F0;
	box-sizing: border-box;
}

.notice-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #1A1A2E;
}

.notice-close {
	position: absolute;
	right: 24rpx;
	top: 24rpx;
	font-size: 44rpx;
	color: #9CA3AF;
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.notice-body {
	flex: 1;
	max-height: 55vh;
	width: 100%;
	box-sizing: border-box;
}

.notice-body-inner {
	padding: 24rpx 32rpx;
	box-sizing: border-box;
}

.notice-section {
	margin-bottom: 32rpx;
}

.section-title {
	display: block;
	font-size: 28rpx;
	font-weight: 600;
	color: #004FCE;
	margin-bottom: 12rpx;
}

.section-content {
	display: block;
	width: 100%;
	font-size: 26rpx;
	color: #4B5563;
	line-height: 1.8;
	box-sizing: border-box;
	word-wrap: break-word;
	word-break: break-all;
}

.notice-footer {
	padding: 24rpx 32rpx 36rpx;
	box-sizing: border-box;
}

.notice-btn {
	background: linear-gradient(135deg, #004FCE, #007FFF);
	color: #fff;
	border-radius: 48rpx;
	font-size: 30rpx;
	border: none;
}

.notice-btn::after {
	border: none;
}
</style>
