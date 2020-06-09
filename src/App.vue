<template>
  <div id="app">
    <router-view />
    <!--控制Footer的显示隐藏-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  /*引入FooterGuide组件*/
  import FooterGuide from './components/FooterGuide/FooterGuide'
  /*方式2*/
  import{mapActions} from 'vuex'

    export default {
      components:{
        FooterGuide
      },
      mounted () {
        /*方式1*/
        //this.$store.dispatch('getAddress')
        /*方式2*/
        this.getAddress()
        this.getUserInfo()
      },
      /*方式2*/
      methods:{
        //App.vue获取actions中的方法
        ...mapActions(['getAddress','getUserInfo'])
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
