<template>
  <view class="page">
    <block v-if="order">
      <view class="info-card">
        <view class="info-header">
          <text class="info-title">{{ order.title }}</text>
          <view class="status-tag" :style="statusStyle">
            {{ order.statusLabel }}
          </view>
        </view>
        <view class="info-row">
          <text class="label">案件编号</text>
          <text class="value">{{ order.workOrderId }}</text>
        </view>
        <view class="info-row">
          <text class="label">机构名称</text>
          <text class="value">{{ order.deptName || '-' }}</text>
        </view>
        <view class="info-row">
          <text class="label">案件日期</text>
          <text class="value">{{ formatDate(order.disputeDate) }}</text>
        </view>
        <!-- <view class="info-row" v-if="order.mediatorName">
          <text class="label">调解员</text>
          <text class="value">{{ order.mediatorName }}</text>
        </view> -->
        <view v-if="showSignedBanner" class="signed-banner">
          <view class="signed-icon">✓</view>
          <view class="signed-text">
            <text class="signed-title">调解协议已签署</text>
            <text class="signed-time" v-if="order.signedAt">签署时间：{{ formatDate(order.signedAt) }}</text>
          </view>
        </view>
      </view>

      <view class="progress-card">
        <text class="section-title">调解进度</text>
        <view class="timeline">
          <view v-for="(step, index) in order.progress" :key="index" class="timeline-item"
            :class="{ done: step.done, last: index === order.progress.length - 1 }">
            <view class="timeline-dot">
              <view class="dot-inner" :class="{ active: step.done }"></view>
            </view>
            <view class="timeline-content">
              <text class="step-title" :class="{ active: step.done }">{{ step.title }}</text>
              <text class="step-desc">{{ step.desc }}</text>
              <text v-if="step.time" class="step-time">{{ step.time }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="currentSignItem" class="sign-area">
        <button class="sign-btn"
          @tap="openShowSignature(currentSignItem.url, currentSignItem.status == 1 ? '签署协议书' : '查看协议书')">
          {{ currentSignItem.status == 1 ? '签署协议书' : '查看协议书' }}
        </button>
      </view>
    </block>

    <view v-else-if="!loading" class="empty-state">
      <text class="empty-text">未找到工单信息</text>
      <button class="back-btn" @tap="goBack">返回列表</button>
    </view>
  </view>
</template>

<script>
import { DEPT_TYPE } from '@/utils/mockData'

export default {
  data() {
    return {
      DEPT_TYPE: DEPT_TYPE,
      workOrderId: '',
      wordContent: {},
      statusList: new Map(),
      insuranceComplaintTypeList: new Map(),
      bankComplaintTypeList: new Map(),
      signItemList: [],
      userPhone: uni.getStorageSync('userPhone'),
      loading: false,
      DM_STATUS: {
        "1": '', // 待前台处理
        "2": '', // 待调解员处理
        "3": '', // 待机构反馈
        "4": '', // 调解中
        "5": '', // 更改调解员审核
        "6": '', // 待机构补充材料
        "10": '', // 已办结
        "20": '', // 已归档
      }

    }
  },
  computed: {
    order() {
      if (!this.wordContent.workOrderId) return null
      const statusLabel = this.statusList.get(this.wordContent.status) || '未知状态'
      return {
        workOrderId: this.wordContent.workOrderId,
        title: this.wordContent.complaintContent || ('案件 ' + this.wordContent.workOrderId),
        deptName: this.wordContent.deptName,
        disputeDate: this.wordContent.disputeDate,
        mediatorName: this.wordContent.mediatorName || this.wordContent.mediatorUserName || '',
        status: this.wordContent.status,
        statusLabel,
        progress: this.buildProgress(statusLabel),
        signedAt: this.wordContent.signedAt || this.wordContent.signTime || ''
      }
    },
    statusStyle() {
      return {
        background: 'rgba(0, 79, 206, 0.1)',
        color: '#004FCE'
      }
    },
    currentSignItem() {
      return this.signItemList.find((item) => {
        return item.phone == this.userPhone && item.customBizNum === 'consumer'
      })
    },
    showSignedBanner() {
      const label = this.order && this.order.statusLabel ? this.order.statusLabel : ''
      if (label.indexOf('签署') !== -1 || label.indexOf('结案') !== -1) return true
      const signItem = this.currentSignItem
      return signItem && signItem.status != 1
    }
  },
  onLoad(options) {
    if (options && options.id) {
      this.workOrderId = options.id
      this.getStatusDict()
      this.getInsuranceComplaintTypeDict()
      this.getBankComplaintTypeDict()
      this.loadDetail()
    }
  },
  onPullDownRefresh() {
    this.loadDetail(true)
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '-'
      return String(dateStr).split(' ')[0]
    },
    getStatusDict() {
      this.$api.main.getDeptType('dm_status').then(res => {
        res.data.forEach(dataRes => {
          this.statusList.set(dataRes.dictValue, dataRes.dictLabel)
        })
      })
    },
    getInsuranceComplaintTypeDict() {
      this.$api.main.getDeptType('dm_insurance_complaint_type').then(res => {
        res.data.forEach(dataRes => {
          this.insuranceComplaintTypeList.set(dataRes.dictValue, dataRes.dictLabel)
        })
      })
    },
    getBankComplaintTypeDict() {
      this.$api.main.getDeptType('dm_bank_complaint_type').then(res => {
        res.data.forEach(dataRes => {
          this.bankComplaintTypeList.set(dataRes.dictValue, dataRes.dictLabel)
        })
      })
    },
    loadDetail(isRefresh) {
      if (!isRefresh) {
        this.loading = true
        uni.showLoading({ title: '加载中' })
      }
      this.$api.main.getDisputeMediation(this.workOrderId).then(r => {
        this.wordContent = r.data || {}
        this.signItemList = (r.data.sign && r.data.sign.signItemList) || []
        this.loading = false
        uni.hideLoading()
        uni.stopPullDownRefresh()
      }).catch(() => {
        this.loading = false
        uni.hideLoading()
        uni.stopPullDownRefresh()
      })
    },
    buildProgress(statusLabel) {
      const disputeTime = this.formatDate(this.wordContent.disputeDate)
      const steps = [
        {
          title: '投诉分类',
          // desc: this.wordContent.complaintContent || '消费者提交金融消费纠纷投诉',
          desc: this.DEPT_TYPE.insuranceList.includes(this.wordContent.deptType) ? this.insuranceComplaintTypeList.get(this.wordContent.insuranceComplaintType) : this.bankComplaintTypeList.get(this.wordContent.bankComplaintType),
          // time: disputeTime !== '-' ? disputeTime : '',
          time: '',
          done: true
        },
        // {
        //   title: statusLabel,
        //   desc: '当前工单状态',
        //   time: '',
        //   done: true
        // }
      ]
      // if (this.wordContent.appeal) {
      //   steps.splice(1, 0, {
      //     title: '主要诉求',
      //     desc: this.wordContent.appeal,
      //     time: '',
      //     done: true
      //   })
      // }
      return steps
    },
    openShowSignature(url, operateName) {
      uni.setStorageSync('H5url', url)
      uni.navigateTo({
        url: '/pages/goToH5Page/goToH5Page?title=' + operateName
      })
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #F0F4F8;
  padding: 24rpx 28rpx 160rpx;
}

.info-card,
.progress-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.04);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28rpx;
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #F3F4F6;
}

.info-title {
  flex: 1;
  font-size: 32rpx;
  font-weight: 600;
  color: #1A1A2E;
  margin-right: 16rpx;
  line-height: 1.4;
}

.status-tag {
  flex-shrink: 0;
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
}

.label {
  font-size: 26rpx;
  color: #9CA3AF;
}

.value {
  font-size: 26rpx;
  color: #374151;
  max-width: 60%;
  text-align: right;
}

.signed-banner {
  display: flex;
  align-items: center;
  margin-top: 24rpx;
  padding: 24rpx;
  background: rgba(52, 199, 89, 0.1);
  border-radius: 16rpx;
  border: 1rpx solid rgba(52, 199, 89, 0.3);
}

.signed-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: #34C759;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.signed-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #34C759;
  margin-bottom: 4rpx;
}

.signed-time {
  font-size: 24rpx;
  color: #6B7280;
}

.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #1A1A2E;
  margin-bottom: 32rpx;
}

.timeline {
  padding-left: 8rpx;
}

.timeline-item {
  display: flex;
  position: relative;
  padding-bottom: 40rpx;
}

.timeline-item.last {
  padding-bottom: 0;
}

.timeline-dot {
  width: 32rpx;
  height: 32rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.dot-inner {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #D1D5DB;
  border: 3rpx solid #E5E7EB;
}

.dot-inner.active {
  width: 20rpx;
  height: 20rpx;
  background: #004FCE;
  border-color: rgba(0, 79, 206, 0.3);
}

.step-title {
  display: block;
  font-size: 28rpx;
  color: #9CA3AF;
  font-weight: 500;
  margin-bottom: 6rpx;
}

.step-title.active {
  color: #1A1A2E;
  font-weight: 600;
}

.step-desc {
  display: block;
  font-size: 24rpx;
  color: #9CA3AF;
  line-height: 1.5;
}

.step-time {
  display: block;
  font-size: 22rpx;
  color: #C0C4CC;
  margin-top: 6rpx;
}

.sign-area {
  margin-bottom: 24rpx;
}

.sign-btn {
  background: #004FCE;
  color: #fff;
  border-radius: 48rpx;
  font-size: 30rpx;
  border: none;
}

.sign-btn::after {
  border: none;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #9CA3AF;
  margin-bottom: 40rpx;
}

.back-btn {
  background: #004FCE;
  color: #fff;
  border-radius: 48rpx;
  font-size: 28rpx;
  padding: 0 60rpx;
  border: none;
}

.back-btn::after {
  border: none;
}
</style>
