<template>
	<view class="container">
	  <ff-canvas id="strip-id" canvas-id="strip" :opts="opts" ref="f2"></ff-canvas>
	  <ff-canvas id="strip-id-s" canvas-id="strips" :opts="opts" ref="f22"></ff-canvas>
	</view>
</template>

<script>
	import F2 from '../../../f2-canvas/lib/f2.js';
	
	let chart = null;
	
	function initChart(canvas, width, height) {
	  chart = new F2.Chart({
	    el: canvas,
	    width,
	    height
	  });
	
	  var Global = F2.Global;
	  var data = [
	    { country: '杭州', population: 666666 }, 
	    { country: '深圳', population: 777777 },
	    { country: '广州', population: 888888 }, 
	    { country: '东莞', population: 999999 }, 
	    { country: '上海', population: 5656452 }
	  ];
	
	  chart.source(data, {
	    population: {
	      tickCount: 5
	    }
	  });
	  chart.coord({
	    transposed: true
	  });
	  chart.axis('country', {
	    line: Global._defaultAxis.line,
	    grid: null
	  });
	  chart.axis('population', {
	    line: null,
	    grid: Global._defaultAxis.grid,
	    label: function label(text, index, total) {
	      var textCfg = {};
	      if (index === 0) {
	        textCfg.textAlign = 'left';
	      } else if (index === total - 1) {
	        textCfg.textAlign = 'right';
	      }
	      return textCfg;
	    }
	  });
	  chart.interval().position('country*population');
	  chart.render();
	  
	  return chart;
	}
	
	
	function initChart1(canvas, width, height) {
	  chart = new F2.Chart({
	    el: canvas,
	    width,
	    height
	  });
	
	  var Global = F2.Global;
	  var data = [
	    { country: '泰国', population: 18203 }, 
	    { country: '美国', population: 23489 },
	    { country: '马来西亚', population: 29034 }, 
	    { country: '日本', population: 104970 }, 
	    { country: '中国', population: 999999 }
	  ];
	
	  chart.source(data, {
	    population: {
	      tickCount: 5
	    }
	  });
	  chart.coord({
	    transposed: true
	  });
	  chart.axis('country', {
	    line: Global._defaultAxis.line,
	    grid: null
	  });
	  chart.axis('population', {
	    line: null,
	    grid: Global._defaultAxis.grid,
	    label: function label(text, index, total) {
	      var textCfg = {};
	      if (index === 0) {
	        textCfg.textAlign = 'left';
	      } else if (index === total - 1) {
	        textCfg.textAlign = 'right';
	      }
	      return textCfg;
	    }
	  });
	  chart.interval().position('country*population');
	  chart.render();
	  
	  return chart;
	}
	
	
	
	
	export default {
		data() {
			return {
				opts: {
				}
			}
		},
		mounted() {
			this.$refs.f2.init(initChart);
			this.$refs.f22.init(initChart1);
			
		}
	}
</script>

<style>
</style>
