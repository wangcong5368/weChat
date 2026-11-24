<template>
  <view class="page">
    <view class="tab-bar">
      <!-- <view class="tab-item" :class="{ active: activeTab === 0 }" @tap="switchTab(0)">调解员信息</view> -->
      <view class="tab-item" :class="{ active: activeTab === 1 }" @tap="switchTab(1)">条例库</view>
      <!-- <view class="tab-indicator" :class="{ 'indicator-right': activeTab === 1 }"></view> -->
    </view>

    <!-- 调解员信息 -->
    <view v-show="activeTab === 0" class="list-wrap">
      <view v-for="item in mediatorList" :key="item.id" class="mediator-card">
        <view class="avatar">
          <text class="avatar-text">{{ item.firstChar }}</text>
        </view>
        <view class="mediator-info">
          <text class="mediator-name">{{ item.displayName }}</text>
          <text class="case-count">调解案件数: {{ item.caseCount }}</text>
        </view>
        <view class="rating-area">
          <text v-for="(star, sIdx) in item.stars" :key="sIdx" class="star-char" :class="star">★</text>
        </view>
      </view>
    </view>

    <!-- 条例库 -->
    <view v-show="activeTab === 1" class="list-wrap">
      <view v-for="item in regulationList" :key="item.id" class="regulation-card">
        <view class="reg-header">
          <text class="reg-title">{{ item.title }}</text>
          <view class="reg-category">{{ item.category }}</view>
        </view>
        <text class="reg-summary">{{ item.summary }}</text>
        <text class="reg-date">发布日期：{{ item.date }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { MOCK_MEDIATORS, MOCK_REGULATIONS } from '@/utils/mockData'

function maskName(name) {
  if (!name || name.length < 2) return name
  var result = name.charAt(0)
  for (var i = 1; i < name.length; i++) {
    result += 'x'
  }
  return result
}

function buildStars(rating) {
  var stars = []
  for (var i = 1; i <= 5; i++) {
    var val = rating - (i - 1)
    if (val >= 1) {
      stars.push('full')
    } else if (val >= 0.5) {
      stars.push('full')
    } else {
      stars.push('empty')
    }
  }
  return stars
}

export default {
  data() {
    return {
      activeTab: 1,
      mediatorList: [],
      regulationList: []
    }
  },
  onLoad() {
    this.mediatorList = MOCK_MEDIATORS.map(function (item) {
      return {
        id: item.id,
        caseCount: item.caseCount,
        firstChar: item.name ? item.name.charAt(0) : '',
        displayName: maskName(item.name),
        stars: buildStars(item.rating)
      }
    })
    this.regulationList = MOCK_REGULATIONS
  },
  methods: {
    switchTab(index) {
      this.activeTab = index
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F0F4F8;
}

.tab-bar {
  display: flex;
  position: relative;
  background: #fff;
  border-bottom: 1rpx solid #F0F0F0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 28rpx 0;
  font-size: 28rpx;
  color: #9CA3AF;
  position: relative;
  z-index: 1;
}

.tab-item.active {
  color: #004FCE;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 4rpx;
  background: #004FCE;
}

.tab-indicator.indicator-right {
  left: 50%;
}

.list-wrap {
  padding: 20rpx 28rpx;
}

.mediator-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1rpx solid #E8ECF0;
  border-radius: 16rpx;
  padding: 28rpx 24rpx;
  margin-bottom: 16rpx;
}

.avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: #E8ECF0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.avatar-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #9CA3AF;
}

.mediator-info {
  flex: 1;
  min-width: 0;
}

.mediator-name {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #1A1A2E;
  margin-bottom: 8rpx;
}

.case-count {
  font-size: 24rpx;
  color: #007FFF;
}

.rating-area {
  flex-shrink: 0;
  margin-left: 12rpx;
  display: flex;
  align-items: center;
}

.star-char {
  font-size: 28rpx;
  margin-right: 2rpx;
  color: #D1D5DB;
}

.star-char.full {
  color: #1A1A2E;
}

.regulation-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.reg-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.reg-title {
  flex: 1;
  font-size: 28rpx;
  font-weight: 600;
  color: #1A1A2E;
  line-height: 1.5;
  margin-right: 16rpx;
}

.reg-category {
  flex-shrink: 0;
  font-size: 22rpx;
  color: #004FCE;
  background: rgba(0, 79, 206, 0.08);
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}

.reg-summary {
  display: block;
  font-size: 26rpx;
  color: #6B7280;
  line-height: 1.7;
  margin-bottom: 16rpx;
}

.reg-date {
  font-size: 22rpx;
  color: #C0C4CC;
}
</style>
