import Vue from 'vue'
import Router from 'vue-router'
import HomeCom from '@/components/HomeCom'
import NavBarCom from '@/components/NavBarCom'
import HorizontalSlider from '@/components/HorizontalSlider'
import RecommendCom from '@/components/RecommendCom'
import TrackCom from '@/components/TrackCom'
import MeCom from '@/components/MeCom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',               // 应用开始界面
      component: HomeCom,      
    },

    // 顶部和底部导航栏组件
    {
      path:'/navigation',      
      component: NavBarCom,
      children: [
        // 新闻导航主页组件
        {
          path: 'news',        
          component: HorizontalSlider,
        },

        // 推荐导航主页组件
        {
          path: 'recommend',    
          component: RecommendCom,
        },

        // 动态导航主页组件
        {
          path: 'track',
          component: TrackCom
        },

        // 关于我导航主页组件
        {
          path: 'me',
          component: MeCom 
        },
      ],
    }
  ]
})
