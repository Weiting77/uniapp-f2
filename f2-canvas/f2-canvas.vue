<template>
	<view class="f2-canvas">
		<canvas class="f2-canvas" :canvas-id="canvasId" :id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
		 @longtap="press" v-show="show">
		</canvas>
		<image class="f2-canvas" :src="temImage" mode="" v-show="!show"></image>
	</view>
</template>

<script>
	import Renderer from './lib/renderer.js';
	import F2 from './lib/f2.js';
	
	F2.Util.addEventListener = function(source, type, listener) {
		source.addListener && source.addListener(type, listener);
	};

	F2.Util.removeEventListener = function(source, type, listener) {
		source.removeListener && source.removeListener(type, listener);
	};

	F2.Util.createEvent = function(event, chart) {
		const type = event.type;
		let x = 0;
		let y = 0;
		const touches = event.touches;
		if (touches && touches.length > 0) {
			x = touches[0].x;
			y = touches[0].y;
		}

		return {
			type,
			chart,
			x,
			y
		};
	};

	export default {
		props: {
			canvasId: {
				type: String,
				value: 'f2-canvas'
			},
			opts: {
				type: Object
			}
		},
		data() {
			return {
				show: true,
				temImage: undefined
			}
		},
		mounted() {
			if (!this.opts) {
				console.warn('组件需绑定 opts 变量，例：<ff-canvas id="mychart-dom-bar" ' +
					'canvas-id="mychart-bar" opts="{{ opts }}"></ff-canvas>');
				return;
			}

			if (!this.opts.lazyLoad && this.opts.onInit) {
				this.init();
			}
		},
		methods: {
			init(callback) {
				const ctx = wx.createCanvasContext(this.canvasId, this); // 获取小程序上下文
				console.log("this.canvasId:"+this.canvasId);
				const canvas = new Renderer(ctx);
				this.canvas = canvas;

				this.f2 = wx.createSelectorQuery().in(this).select('.f2-canvas')
				this.f2.boundingClientRect(res => {
					if (typeof callback === 'function') {
						this.chart = callback(canvas, res.width, res.height);
					} else if (this.opts && this.opts.onInit) {
						this.chart = this.opts.onInit(canvas, res.width, res.height);
					}
				}).exec();
			},
			touchStart(e) {
				console.log(this.canvas, e)
				if (this.canvas) {
					this.canvas.emitEvent('touchstart', [e]);
				}
			},
			touchMove(e) {
				if (this.canvas) {
					this.canvas.emitEvent('touchmove', [e]);
				}
			},
			touchEnd(e) {
				if (this.canvas) {
					this.canvas.emitEvent('touchend', [e]);
				}
			},
			press(e) {
				if (this.canvas) {
					this.canvas.emitEvent('press', [e]);
				}
			},
			closeCanvas() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						wx.canvasToTempFilePath({
						  canvasId: this.canvasId,
						  success: res => {
						    console.log(res.tempFilePath)
							this.show = false
							this.temImage = res.tempFilePath
							resolve()
						  },
						  fail: () => {
						  	reject()
						  }
						}, this)
					}, 500)
				})
			},
			openCanvas() {
				this.show = true
			}
		}
	}
</script>

<style>
	.f2-canvas {
		width: 100%;
		height: 100%;
	}
</style>
