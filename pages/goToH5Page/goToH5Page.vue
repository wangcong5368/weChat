<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
	
</template>
<script>
	export default {
		data() {
			return {
				src:"",
				title:"",
			};
		},
		onUnload(){
			if(this.title == "签名"){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}else if(this.title == "查看"){
			}
		},
		onLoad(options) {
			this.title = options.title
			// this.src ="https://protecting-consumers-8bbfbe7864c-1324739338.tcloudbaseapp.com/h5Index.html?nameurl="
			// console.log(this.src,uni.getStorageSync('H5url'),"a>>?");
			// this.src ="https://protecting-consumers-8bbfbe7864c-1324739338.tcloudbaseapp.com/h5Index.html?nameurl=" +uni.getStorageSync('H5url')+ "t="+ new Date().getTime()
			
			 this.src = uni.getStorageSync('H5url') +(uni.getStorageSync('H5url').includes("?") ? "&" :"?") + "t="+ new Date().getTime()
			 console.log(this.src,uni.getStorageSync('H5url'),"a>>?");
	  },
	}
	
</script>
<style lang="scss">
</style>
