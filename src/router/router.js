import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/bill-list',
      name: 'bill.index',
      component: () => import('../views/voucher/BillList.vue')
    },
    {
      path: '/bill-create',
      name: 'bill.create',
      component: () => import('../views/voucher/BillCreate.vue')
    },
    {
      path: '/vehiche',
      name: 'vehiche.index',
      component: () => import('../views/vehiche/Index.vue')
    },
    {
      path: '/customer',
      name: 'customer.index',
      component: () => import('../views/customer/Index.vue')
    },
    {
      path: '/vehicle-type',
      name: 'vehicleType.index',
      component: () => import('../views/vehicleType/Index.vue')
    },

    {
      path: '/technician',
      name: 'technician.index',
      component: () => import('../views/technician/Index.vue')
    },
    {
      path: '/product-services',
      name: 'product-services.index',
      component: () => import('../views/product_services/Index.vue')
    },
    {
      path: '/transactions',
      name: 'transactions.index',
      component: () => import('../views/transactions/Index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
