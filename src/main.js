import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
//引入axiox 请求
import http from '../src/api/index';
Vue.use(http)

// 引入全局样式
import '@/assets/css/index.scss'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
