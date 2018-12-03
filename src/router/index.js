import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/meituanHome1.1.3'
    },
    {
      path:'/HomePage',
      name:'HomePage',
      meta:{
        title:"小蛮牛",
        icoUrl:"static/ico/xiaomanniu.ico"
      },
      component:resolve=>require(['../components/HomePage.vue'],resolve)
    },{
      path:'/TakeATaxiByDiDi',
      name:'TakeATaxiByDiDi',
      meta:{
        title:"滴滴客服",
        icoUrl:"static/ico/didiIcon.ico"
      },
      component:resolve=>require(['../components/TakeATaxiByDiDi.vue'],resolve)
    },
    {
      path:'/meituanHome1.1.2',
      name:'meituanHome1.1.2',
      meta:{
        title:"美团系统"
      },
      component:resolve=>require(['../components/meituanHome.vue'],resolve)
    },
    {
      path:'/meituanHome1.1.3',
      name:'meituanHome1.1.3',
      meta:{
        title:"美团系统"
      },
      component:resolve=>require(['../components/meituanHome1-1-3.vue'],resolve)
    },

  ]
});
router.afterEach(route => {
  document.getElementsByTagName("title")[0].innerText = route.meta.title;
  document.getElementById("linkIcon").href = route.meta.icoUrl;
});
export default router;
