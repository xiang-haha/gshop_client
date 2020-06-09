/*
入口JS
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {Button} from 'mint-ui'
import Split from './components/Split/Split'
//不需要暴露，加载mockServer即可
import './mock/mockServer.js'

//引入图片懒加载vue-lazyload
import VueLazyload from 'vue-lazyload'
//引入图片懒加载的图片
import loading from './common/imgs/loading.gif'

//注册为全局组件标签<mt-button>,在Profile.vue中登出使用
Vue.component(Button.name, Button)
// 注册为全局组件标签<Split>,在ShopRatings.vue/ShopInfo.vue中使用
Vue.component('Split', Split)

Vue.use(VueLazyload, {//内部自定义一个指令lazy
  loading
})

new Vue({
  el: '#app',
  render: h => h(App),
  router, //使用vue-router
  store   //使用vuex
})

