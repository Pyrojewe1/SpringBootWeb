import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddProduct from '@/components/AddProduct'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail"
import AdminHome from "../components/AdminHome"
import Resist from "../components/Resist";
import MyOrder from "../components/MyOrder"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/AdminHome',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },

    {
      path: '/AddProduct',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/manage',
      redirect: '/Login'
    },
    {
      path:'/Resist',
      name:'Resist',
      component:Resist
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    },
    {
      path:'/ProductDetail',
      name:'ProductDetail',
      component:ProductDetail

    }
  ]
})
