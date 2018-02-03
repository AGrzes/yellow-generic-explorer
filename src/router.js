import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
  name: 'list',
  path: '/list',
  component: {
    template: `<div>
    <h1>List</h1>
    <router-view></router-view>
    </div>`
  },
  children: [{
    name: 'item',
    path: ':key',
    component: {
      template: `<p>item</p>`
    }
  }]
}]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
