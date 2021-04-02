import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import f2Canvas from '@/f2-canvas/f2-canvas.vue'

Vue.component('ff-canvas', f2Canvas)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
