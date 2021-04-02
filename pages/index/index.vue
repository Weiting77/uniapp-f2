<template>
	<view class="page">
	  <view  v-for="chart in charts" :key="chart.name"  class="list-item">
	     <image :src="`/static/${chart.name}.png`" mode="aspectFit" @tap="jump(chart)" ></image> 
	    {{chart.value}}
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				charts: [
				    { name: 'strip', value: '条形图' },
				  ]
				}
		},
		methods: {
			jump({name: page, value: title}) {
			  uni.navigateTo({
			    url: '/pages/charts/' + page + '/' + page,
				success() {
					uni.setNavigationBarTitle({
						title
					})
				}
			  })
			}
		}
	}
</script>

<style>
	.page {
	  padding: 10px;
	  margin: 0;
	  list-style: none;
	  
	  display: -webkit-box;
	  display: -moz-box;
	  display: -ms-flexbox;
	  display: -webkit-flex;
	  display: flex;
	  
	  -webkit-flex-flow: row wrap;
	  justify-content: space-between;
	  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
	}
	.list-item {
	  padding: 5px;
	  width: 70px;
	  height: 100px;
	  text-align: center;
	  font-size: 12px;
	  margin-top: 10px;
	}
	
	.list-item image {
	  box-sizing: border-box;
	  width: 100%;
	  height: 70px; 
	  padding: 12px;
	  background-color: #fff;
	  border: 1px solid #eee;
	  border-radius: 4px;  
	  display: block;
	  margin: 0 auto;
	  margin-bottom: 10px;
	}
	
	.list-item-block {
	  height: 80rpx;
	  line-height: 80rpx;
	  /* text-indent: 30rpx; */
	  border-bottom: 2rpx solid #cccccc; 
	  width: 100%;
	  color: #808080;
	  font-size: 12px;
	}
	
</style>
