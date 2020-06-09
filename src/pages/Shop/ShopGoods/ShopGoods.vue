<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: currentIndex === index}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
               {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook"  v-for="(good ,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"  v-for="(food ,index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"s :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food = "food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="refFood"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  /*引入3个子组件*/
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  //引入better-scroll
  import BScroll from 'better-scroll'

  export default{
    data () {
      return {
        scrollY: 0, //右侧滑动的Y轴坐标 (滑动过程中实时变化)
        tops: [],   //所有右侧分类li的top组成的数组 (列表第一次显示后就不再变化)
        food: {},   //点击后，需要显示的food
      }
    },
    mounted () {
      //获取商品列表数据，使用 axios 请求 mockjs 提供的接口
      this.$store.dispatch('getShopGoods', () => {//goods更新了, 界面还没有更新
        this.$nextTick(() => {//列表数据更新显示后执行
          // 初始化滚动
          this._initScroll()
          // 初始化tops
          this._initTops()
        })
      })
    },
    methods: {
      //初始化滚动(一般事件相关的方法加'_')
      _initScroll () {
        //左侧分类列表的 BScroll
        new BScroll('.menu-wrapper',{
          click: true //响应点击
        })
        //右侧 food 列表的 BScroll
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType: 2, // 手指滑动(惯性滑动和编码滑动不监视)
          click: true //响应点击
        })
        //给右侧列表绑定scroll监听,监视滑动过程
        this.foodsScroll.on('scroll',({x, y})=>{
          //保存y
          this.scrollY = Math.abs(y)
          console.log('scroll', this.scrollY)
        })
        //给右侧列表绑定scroll结束监听, 监视滑动结束
        this.foodsScroll.on('scrollEnd',({x, y})=>{
          // 解决惯性滑动更新
          this.scrollY = Math.abs(y)
          console.log('scrollEnd', this.scrollY)
        })
      },
      //初始化tops
      _initTops(){
        //1.初始化tops
        const tops = []
        let top = 0
        //计算各个 top, 并保存到 tops
        tops.push(top)
        //2.收集__找到所有分类的li
        const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook")
        //Array.prototype.slice.call(lis)表示将伪数组lis的所有值遍历截取出来
        //方式1
        /*Array.prototype.forEach.call(lis, li =>{
          top += li.clientHeight
          tops.push(top)
          console.log(top)
        })*/
        //方式2
        Array.prototype.slice.call(lis).forEach((li, index) =>{
          top += li.clientHeight
          tops.push(top)
        })
        //保存tops,更新数据
        this.tops = tops
        console.log(this.tops)
      },
      //点击左侧，右侧滑动food
      clickMenuItem(index){
        //使右侧列表滑动到对应的位置
        //得到目标位置的scrollY
        const top = this.tops[index]
        //立即更新scrollY（让左侧点击的分类项成为当前分类）
        this.scrollY = top
        //平滑滑动右侧列表
        this.foodsScroll.scrollTo(0, -top, 1000)
      },
      //显示点击的food
      showFood(food){
        //设置food
        this.food = food
        //显示food组件 (父组件调用子组件对象的方法)
        this.$refs.refFood.toggleShow()
      }
    },
    computed:{
      //从state中读取数据，应用到组件中
      ...mapState(['goods']),

      //计算得到当前分类的下标
      currentIndex(){
        //(1)得到条件数据
        const {scrollY, tops} = this
        //(2)根据条件计算产生一个结果
        //在测试条件时返回true时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行
        const curIndex = tops.findIndex((top, index) =>{
          //scrollY >= 当前top && scrollY <= 下一个top
          return scrollY >= top && scrollY < tops[index + 1]
        })
        console.log('------'+ curIndex);
        //(3)返回结果
        return curIndex
      }
    },
    components: {
      CartControl,
      Food,
      ShopCart,
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
