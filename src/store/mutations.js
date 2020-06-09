/*
 【3】直接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
} from './mutation-types'

import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo
 },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  /*增加food数量*/
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count){ //第一次增加时, 没有 count
      //food.count = 1 //新增属性count(没有数据绑定)
      //Vue.set(对象, 属性名, 属性值)
      Vue.set(food, 'count', 1) //让新增的属性进行数据绑定
      //将food添加到shopCart购物车列表中
      state.shopCart.push(food)
    }else{//有count
      food.count++
    }
  },
  /*减少food数量*/
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count){//count有值才减 1
      food.count--
      if(food.count === 0){
          //将food从cartFoods中移除
          state.shopCart.splice(state.shopCart.indexOf(food), 1)
      }
    }
  },
  //清空购物车
  [CLEAR_CART](state){
    // 将所有 food 的 count 置为 0
    state.shopCart.forEach(food => food.count = 0)
    // 将购物车重置为空数组
    state.shopCart = []
  },
  //接收搜索的商家列表
  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  }
}

