import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashborad from '@/components/Dashborad'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrders'
import CustomerOrderOut from '@/components/pages/CustomerOrderOut'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index/customer_order'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashborad',
      component: Dashborad,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ]
    },

    {
      path: '/index',
      name: 'Dashborad',
      component: Dashborad,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'CustomerOrderOut/:orderId',
          name: 'CustomerOrderOut',
          component: CustomerOrderOut,
        }
      ]
    },
  ]
})
