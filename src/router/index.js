import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'

// 左侧导航栏
import NavLi from '@/components/LeftNav/NavLi'
import NavLiTwo from '@/components/LeftNav/NavLiTwo'
import NavLiThree from '@/components/LeftNav/NavLiThree'
import NavLiFour from '@/components/LeftNav/NavLiFour'
import NavLiFive from '@/components/LeftNav/NavLiFive'
import NavLiSix from '@/components/LeftNav/NavLiSix'
import NavLiSev from '@/components/LeftNav/NavLiSev'
import NavLiEig from '@/components/LeftNav/NavLiEig'
import NavLiNine from '@/components/LeftNav/NavLiNine'

import BookDetail from '@/components/BookDetail'
import BuyBook from '@/components/BuyBook'
import MyCart from '@/components/MyCart'
import JieSuan from '@/components/JieSuan'
import MyOrder from '@/components/MyOrder'
import MyCollect from '@/components/shoucangjia/MyCollect'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {path:'/navlione',name:'NavLi',component:NavLi},
        {path:'/navlitwo',name:'NavLiTwo',component:NavLiTwo},
        {path:'/navlithree',name:'NavLiThree',component:NavLiThree},
        {path:'/navlifour',name:'NavLiFour',component:NavLiFour},
        {path:'/navlifive',name:'NavLiFive',component:NavLiFive},
        {path:'/navlisix',name:'NavLiSix',component:NavLiSix},
        {path:'/navlisev',name:'NavLiSev',component:NavLiSev},
        {path:'/navlieig',name:'NavLiEig',component:NavLiEig},
        {path:'/navlinine',name:'NavLiNine',component:NavLiNine}
      ]
    },
    {path:'/login',name:'Login',component:Login},
    {path:'/login',name:'Register',component:Register},
    {path:'/bookdetail',name:'BookDetail',component:BookDetail},
    {path:'/buybook',name:'BuyBook',component:BuyBook},
    {path:'/mycart',name:'MyCart',component:MyCart},
    {path:'/jiesuan',name:'JieSuan',component:JieSuan},
    {path:'/myorder',name:'MyOrder',component:MyOrder},
    {path:'/mycollect',name:'MyCollect',component:MyCollect}
  ]
})
