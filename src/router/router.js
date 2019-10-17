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
      path: '/login',
      name: 'home',
      component: () => import('../views/auth/SignIn.vue')
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
      path: '/voucher-report/:id',
      name: 'voucher.report',
      component: () => import('../views/voucher/Report.vue')
    },
    {
      path: '/voucher/create/:id',
      name: 'voucherreport.create',
      component: () => import('../views/voucher/Create.vue')
    },

    // vehicle 
    {
      path: '/vehiche',
      name: 'vehiche.index',
      component: () => import('../views/vehiche/Index.vue')
    },
    {
      path: '/vehiche/create',
      name: 'vehiche.create',
      component: () => import('../views/vehiche/VehicleEntry.vue')
    },
    {
      path: '/vehiche/repairable',
      name: 'repairable.index',
      component: () => import('../views/vehiche/Repairable.vue')
    },
      {
          path: '/vehicle/bill-list/:id',
          name: 'vehicle.bill',
          component: () => import('../views/vehiche/BillList.vue')
      },
    {
      path: '/customer',
      name: 'customer.index',
      component: () => import('../views/customer/Index.vue')
    },
      {
      path: '/customer/vehicle/:id',
      name: 'customer.vehicle_details',
      component: () => import('../views/customer/VehicleDetails.vue')
    },
    // vehicle type route
    {
      path: '/vehicle-type',
      name: 'vehicleType.index',
      component: () => import('../views/vehicleType/Index.vue')
    },
    {
      path: '/vehicle-type/create',
      name: 'vehicleType.create',
      component: () => import('../views/vehicleType/Create.vue')
    },
    {
      path: '/vehicle-type/edit/:id',
      name: 'vehicleType.edit',
      component: () => import('../views/vehicleType/Edit.vue')
    },


    {
      path: '/technician',
      name: 'technician.index',
      component: () => import('../views/technician/Index.vue')
    },
    {
      path: '/technician/create',
      name: 'techinican.create',
      component: () => import('../views/technician/Create.vue')
    },
    {
      path: '/technician/edit/:id',
      name: 'techinican.edit',
      component: () => import('../views/technician/Edit.vue')
    },
    // product and services route
    {
      path: '/product-services',
      name: 'product-services.index',
      component: () => import('../views/product_services/Index.vue')
    },
    {
      path: '/product-services/create',
      name: 'product-services.create',
      component: () => import('../views/product_services/Create.vue')
    },
    {
      path: '/product-services/edit/:id',
      name: 'product.edit',
      component: () => import('../views/product_services/Edit.vue')
    },


    // transactions
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
