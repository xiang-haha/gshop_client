<template>
  <section class="msite">
    <!--首页头部-->
    <!--3. 使用组件标签-->
    <!--模板显示从state中获取的数据-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userInfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <!--1、根据一维数组生成二位数组
              2、实现延迟到更新界面之后执行轮播-->
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div >
      <!-- 加载中的图片显示 -->
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
      </div>
      <!--3. 使用组件标签-->
      <ShopList></ShopList>
    </div>
  </section>
</template>
<script>
  import Swiper from 'swiper'     /*引入swiper的js*/
  import 'swiper/css/swiper.css' /*引入swiper的css*/

  //1. 引入组件
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'

  import {mapState} from 'vuex'

    export default {
        data(){
          return {
            baseImageUrl: 'https://fuss10.elemecdn.com'
          }
        },
        mounted () {
          this.$store.dispatch('getCategorys')
          this.$store.dispatch('getShopps')
        },

        computed:{
           //读取state中的数据
            ...mapState(['address','categorys','userInfo']),
          /*
          根据categorys的1维数组生成一个2维数组
          小数组中的元素个数最大是8
           */
          categorysArr(){
            const {categorys} = this;
            const arr = [];  //准备空的2维数组
            let minArr = []; //准备2维数组中的小数组（最大长度为8）

            //遍历categorys
            categorys.forEach(c =>{
              //如果当前小数组满了8个，创建一个新的
              if(minArr.length === 8){
                minArr = [];
              }
              //如果minArr是空的，将小数组保存到大数组中
              if(minArr.length === 0){
                arr.push(minArr);
              }
              //将当前分类保存到小数组中
              minArr.push(c);
            })
            return arr;
          }
      },

        watch:{
          //监视categorys数组中有数据了，但轮播是在异步更新界面之前执行。
          categorys(value){
          /*【方式1】setTimeout可以实现轮播在更新界面之后执行，但不是太好
            setTimeout(()=>{
              //创建一个Swiper实例对象，来实现轮播
              new Swiper('.swiper-container',{
                loop: true, // 可以循环轮播
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination'
                },
              })
            },600)*/

          //【方式2】$nextTick在界面完成更新，就立即创建swiper对象，实现轮播
            this.$nextTick(()=>{ // (此条语句要写在数据更新之后)
              //创建一个Swiper实例对象，来实现轮播
              new Swiper('.swiper-container',{
                loop: true, // 可以循环轮播
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination'
                },
              })
            })
          }
        },
        //2. 映射组件标签
        components:{
          HeaderTop,
          ShopList
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
