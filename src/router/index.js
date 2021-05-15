import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login"
import Header from "../views/Header"
import Register from "../views/Register"
import Classify from "../views/Classify"
import Message  from "../views/Message"
import Cart from "../views/Cart";
import Ranking from "../views/Ranking";
import OrderForm from "../views/OrderForm";
import Home from "../views/Home";
import Detail from "../views/Detail";
import UserPage from "../views/UserPage";
import Address from "../views/Address";
import HeaderDetail from "../views/HeaderDetail";
import Search from "../views/Search";
import ClassifySearch from "../views/ClassifySearch";
import Success from "../views/Success";
import User from "../views/User";
import UserOrder from "../views/UserOrder";
import Retrieve from "../views/Retrieve";
import Reset from "../views/Reset";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "首页",
    component: Header,
    redirect:"/Login",
    children:[
      {
        path: "/Home",
        name: "首页",
        component: Home,
      },
      {
        path:'/Classify',
        name:"分类",
        component:Classify
      },
      {
        path:'/Search/:user',
        name:"关键字搜索",
        component:Search
      },
      {
        path:'/ClassifySearch/:titlekey',
        name:"分类搜索",
        component:ClassifySearch
      },
      {
        path:'/Message',
        name:"留言",
        component:Message
      },
      {
        path:'/Ranking',
        name:"排行",
        component:Ranking
      },
      {
        path:'/Detail/:id',
        name:"详情页",
        component:Detail,
      },
      {
        path:'/HeaderDetail/:id',
        name:"详情页",
        component:HeaderDetail,
      },
      {
        path: '/UserPage',
        name: "个人中心",
        component: UserPage,
        children:[
          {
            path:'/User',
            name:"用户",
            component:User,
          },
          {
            path:'/Address',
            name:"收货地址",
            component:Address,
          },
          {
            path:'/UserOrder',
            name:"我的订单",
            component:UserOrder,
          },
        ],
        meta:{
          isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
        }//路由元
      },
      {
        path:'/Cart',
        name:"购物车",
        component:Cart,
        meta:{
          isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
        }//路由元
      },
      {
        path:'/OrderForm',
        name:"订单",
        component:OrderForm,
        meta:{
          isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
        }//路由元
      },
      {
        path:'/Success',
        name:"提交订单成功",
        component:Success,
        meta:{
          isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
        }//路由元
      }
    ]
  },
  {
    path:'/Login',
    name:"登录",
    component:Login
  },
  {
    path:'/Register',
    name:"注册",
    component:Register
  },
  {
    path:'/Retrieve',
    name:"找回密码",
    component:Retrieve,
    // meta:{
    //   isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
    // }//路由元
  },
  {
    path:'/Reset',
    name:"重置密码",
    component:Reset,
    meta:{
      isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
    }//路由元
  }



]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
    if (window.sessionStorage.getItem('userName')) {
      next();
    }else{
      next({
        path:"/Login",
        query:{
          redirect:to.fullPath
        }
      });
    }

  }else{
    next()
  }
});

export default router
