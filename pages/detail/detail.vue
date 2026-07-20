<!-- 工单详情页 -->
<template>
  <view class="content">
    <!-- <view class="title">消费者信息</view> -->
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        消费者名字：
      </view>
      <view class="">
        {{ wordContent.name == null ? ' ' : wordContent.name }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 140px;">
        消费者联系方式：
      </view>
      <view class="">
        {{ wordContent.phone == null ? ' ' : wordContent.phone }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        证件类型：
      </view>
      <view class="">
        {{ wordContent.certType == null ? ' ' : (certTypeList.get(wordContent.certType) || ' ') }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        证件号码：
      </view>
      <view class="">
        {{ wordContent.certNum == null ? ' ' : wordContent.certNum }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        性别：
      </view>
      <view class="">
        {{ wordContent.sex == null ? ' ' : (sysUserSexList.get(wordContent.sex) || ' ') }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        年龄：
      </view>
      <view class="">
        {{ wordContent.age == null ? ' ' : wordContent.age }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        民族：
      </view>
      <view class="">
        {{ wordContent.nation == null ? ' ' : wordContent.nation }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        职业：
      </view>
      <view class="">
        {{ wordContent.profession == null ? ' ' : wordContent.profession }}
      </view>
    </view>

    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        单位或住址：
      </view>
      <view class="">
        {{ wordContent.address == null ? ' ' : wordContent.address }}
      </view>
    </view>
    <!-- <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        纠纷发生日期：
      </view>
      <view class="">
        {{ wordContent.disputeDate == null ? ' ' : wordContent.disputeDate.split(' ')[0] }}
      </view>
    </view> -->
    <!-- <view class="title">机构信息</view> -->
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        机构名称：
      </view>
      <view class="">
        {{ wordContent.deptName == null ? ' ' : wordContent.deptName }}
      </view>
    </view>
    <view class="title_Box">
      <view style="color: #666666;     width: 120px;">
        机构类型：
      </view>
      <view class="">
        {{ wordContent.deptType == null ? ' ' : (deptTypeList.get(wordContent.deptType) || ' ') }}
      </view>
    </view>
    <!-- <view class="title">投诉内容</view> -->
    <view class="title_Box" style="width: 100%;">
      <view style="color: #666666;flex:1">
        投诉内容：
      </view>
      <view class="" style="flex:3">
        {{ wordContent.complaintContent == null ? '-' : wordContent.complaintContent }}
      </view>
    </view>
    <!-- <view class="title_Box">
			<view style="color: #666666;     width: 120px;">
				机构所在地：
			</view>
			<view class="">
				{{wordContent.deptAddress  == null ? ' ' :wordContent.deptAddress}}
			</view>
		</view>
		<view class="title_Box">
			<view style="color: #666666;     width: 120px;">
				纠纷日期：
			</view>
			<view class="">
				{{wordContent.disputeDate  == null ? ' ' :wordContent.disputeDate}}
			</view>
		</view>
		<view class="title_Box">
			<view style="color: #666666;     width: 120px;">
				机构所在区域：
			</view>
			<view class="">
				{{wordContent.deptArea  == null ? ' ' :wordContent.deptArea}}
			</view>
		</view>
		<view class="title_Box">
			<view style="color: #666666;     width: 120px;">
				投诉内容：
			</view>
			<view class="">
				{{wordContent.complaintContent  == null ? '' :wordContent.complaintContent}}
			</view>
		</view>
		<view class="title_Box">
			<view style="color: #666666;     width: 120px;">
				主要诉求：
			</view>
			<view class="">
				{{wordContent.appeal  == null ? ' ' :wordContent.appeal}}
			</view>
		</view> -->
    <view class="" style="margin: 40rpx 0rpx;">
      <button v-if="currentSignItem"
        style="background-color: #47a3ff; color: #FFF;margin-bottom:40rpx;min-width: 40vw;margin-top: 20px; border-radius: 20px;"
        @click="openShowSignature(currentSignItem.url, currentSignItem.status == 1 ? '签署协议书' : '查看协议书')">{{
          currentSignItem.status == 1 ? '签署协议书' : '查看协议书' }}</button>
    </view>
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      wordContent: {
        name: '',//消费者名字
        phone: '',//消费者联系方式
        certType: '',//证件类型
        certNum: '',//证件号码
        sex: '',//性别
        age: '',//年龄
        nation: '',//民族
        profession: '',//职业
        address: '',//单位或住址
        deptName: '',//机构名称
        deptType: '',//机构类型
        deptAddress: '',//机构所在地
        disputeDate: '',//纠纷日期
        deptArea: '',//机构所在区域
        complaintContent: '',//投诉内容
        appeal: '',//主要诉求
      },//工单详情
      deptNameList: [
        {
          name: 'sys_user_sex',
          listName: 'sysUserSexList'
        },
        {
          name: 'cert_type',
          listName: 'certTypeList'
        },
        {
          name: 'dept_type',
          listName: 'deptTypeList'
        }
      ],// 需要获取的字典name
      sysUserSexList: new Map(),//用户性别字典表
      certTypeList: new Map(),//证件类型字典表
      deptTypeList: new Map(),//机构类型字典表
      signItemList: [],//e签宝列表
      userPhone: uni.getStorageSync('userPhone'),//用户手机号
      signItemTepy: new Map([["consumer", "消费者告知书签字"], ["dept", "机构告知书签字"], ["mediator", "调解员告知书签字"], ["assistant", "助理调解员告知书签字"], ["zh", "众和告知书签字"]]),//e签宝人员签字操作字典
      signItemLookTepy: new Map([["consumer", "消费者告知书查看"], ["dept", "机构告知书查看"], ["mediator", "调解员告知书查看"], ["assistant", "助理调解员告知书查看"], ["zh", "众和告知书查看"]]),//e签宝人员查看操作字典

    }
  },
  computed: {
    // 根据用户类型获取当前用户对应的签字项
    currentSignItem() {
      const userInfo = uni.getStorageSync('userInfo');
      // 如果没有userInfo或者isDMMediator和isDMInstitution都为false，则为消费者用户
      if (!userInfo || (!userInfo.isDMMediator && !userInfo.isDMInstitution)) {
        // 消费者用户：显示与当前用户手机号匹配的消费者签字项
        return this.signItemList.find((item) => {
          return item.phone == this.userPhone && item.customBizNum === 'consumer';
        });
      }

      // 调解员用户
      if (userInfo.isDMMediator) {
        // 检查是否是助理调解员：工单详情的assistantUserId等于当前登录用户的ID
        if (this.wordContent.assistantUserId && userInfo.userId && this.wordContent.assistantUserId == userInfo.userId) {
          // 助理调解员：显示助理调解员告知书签字项
          return this.signItemList.find((item) => {
            return item.customBizNum === 'assistant';
          });
        } else {
          // 普通调解员：显示调解员告知书签字项
          return this.signItemList.find((item) => {
            return item.customBizNum === 'mediator';
          });
        }
      }

      // 机构用户
      if (userInfo.isDMInstitution) {
        return this.signItemList.find((item) => {
          return item.customBizNum === 'dept';
        });
      }

      return null;
    }
  },
  onPullDownRefresh() {
    uni.showLoading({
      title: '加载中'
    });
    this.getEvaluation()
  },
  onLoad(options) {
    uni.showLoading({
      title: '加载中'
    });
    console.log(options);
    this.workOrderId = options.id
    this.getDeptType()

    this.signItemTepy.set()
    setTimeout(() => {
      this.getEvaluation()
    }, 1000)

  },
  methods: {
    //获取字典表
    getDeptType() {
      const hasToken = getToken();
      this.deptNameList.map(r => {
        // 根据登录方式调用不同的接口
        const apiCall = hasToken
          ? this.$api.orgApi.getDeptType(r.name)  // 有token调用机构接口
          : this.$api.main.getDeptType(r.name);   // 无token调用微信接口

        apiCall.then(res => {
          res.data.forEach(dataRes => {
            this[`${r.listName}`].set(dataRes.dictValue, dataRes.dictLabel);
          })
        })
      })
    },
    //跳转H5
    openShowSignature(url, operateName) {
      // 获取当前用户信息
      const userInfo = uni.getStorageSync('userInfo');
      let roleName = '';

      // 根据用户类型和当前签字项确定角色名称
      if (!userInfo || (!userInfo.isDMMediator && !userInfo.isDMInstitution)) {
        roleName = '消费者';
      } else if (userInfo.isDMMediator) {
        // 检查是否是助理调解员
        if (this.wordContent.assistantUserId && userInfo.userId && this.wordContent.assistantUserId == userInfo.userId) {
          roleName = '助理调解员';
        } else {
          roleName = '调解员';
        }
      } else if (userInfo.isDMInstitution) {
        roleName = '机构用户';
      }

      // 在控制台输出角色和操作类型
      console.log(`${roleName}${operateName}`);

      uni.setStorageSync("H5url", url)
      uni.navigateTo({
        url: '/pages/goToH5Page/goToH5Page?title=' + operateName
      })
    },
    formatDate(cellValue) {
      if (cellValue == null || cellValue == "") return "";
      var date = new Date(cellValue)
      var year = date.getFullYear()
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },//时间格式化
    getEvaluation() {
      // 根据登录方式调用不同的接口
      const hasToken = getToken();
      const apiCall = hasToken
        ? this.$api.orgApi.getDisputeMediation(this.workOrderId)  // 有token调用机构接口
        : this.$api.main.getDisputeMediation(this.workOrderId);   // 无token调用微信接口

      apiCall.then(r => {
        this.wordContent = r.data
        console.log(r.data, "r.data");

        this.signItemList = r.data.sign.signItemList
        uni.hideLoading();
      }).catch(over => {
        uni.hideLoading();
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.progressImage {
  margin-bottom: 10px;
}

.inputFrame {
  background-color: white;
  padding: 3px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.user_for {
  display: flex;
}

.item_year {
  font-size: 34rpx;
  height: 50rpx;
}

.line_for {
  width: 4rpx;
  height: 100%;
  margin: 0 20rpx 10rpx;
  background-color: #559DFF;
}

.line_radio {
  width: 40rpx;
  height: 40rpx;
  position: relative;
  transform: translateX(5%);
  top: 20rpx;
}

.right_box {
  padding: 0rpx 20rpx 20rpx 20rpx;
  width: 100%;
}

.right_box_title {}

.desc {
  font-size: 24rpx;
  color: #8e8b8d;
  display: flex;
  margin-top: 5rpx;
  align-items: center;

}

.descTime {
  font-size: 30rpx;
  color: #8e8b8d;
  display: flex;
  margin-top: 5rpx;
  margin-bottom: 20rpx;
  align-items: center;

}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}

.headTitle {
  border-bottom: 2rpx solid #F2F2F2;
  font-size: 30rpx;
  font-weight: bold;
  color: #000000;
  padding-top: 20rpx;
  padding-bottom: 40rpx;
  margin-bottom: 5rpx;
}

.title {
  margin: 40rpx 0px;
  font-size: 40rpx;
  font-weight: bold;
  color: #00aeff;
  line-height: 0rpx;
  letter-spacing: 2rpx;
  // border-bottom: 2rpx solid #F2F2F2;
  padding-bottom: 30rpx;
  padding-top: 15rpx;
}

.title_Box {
  display: flex;
  padding-bottom: 30rpx;
  padding-top: 15rpx;
  border-bottom: 2rpx solid #F2F2F2;
  justify-content: space-between;
}

.message,
.content {
  width: 88%;
  margin: 20rpx auto;
  background-color: #fff;
  padding: 30rpx;
  border-radius: 10rpx;
  line-height: 2;
}

.message {
  // margin-bottom: 20rpx;
}

.attention {
  background-color: #FFFAE7;
  padding: 20rpx;

  text {
    margin-left: 8rpx;
  }
}

.wrap-upload {
  //上传图片和附件
  margin-bottom: 20rpx;

  .title-upload {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
}

.wrap-btn {
  margin: 58rpx auto;

  .btn {
    color: #FFFFFF;
    background-color: #2AC79C;

    .attention-text1 {
      margin-bottom: 8rpx;
    }
  }
}
</style>
