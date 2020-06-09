/*
 路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
*/
const Msite = () => import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')

import Login from '../pages/Login/Login'

import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  routes:[
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      //返回路由组件的函数，只有执行函数时加载
      component: Msite,
      //控制Footer的显示隐藏
      meta:{
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    }
  ]
})
