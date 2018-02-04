import Vue from 'vue'
import VueRouter from 'vue-router'
import gatData from './data'
Vue.use(VueRouter)
const routes = [{
  name: 'list',
  path: '/list',
  component: {
    template: `<div class="row">
      <div class="col-3">
        <yellow-link-list :items="data.items"></yellow-link-list>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>`,
    data(){
      gatData.then((data)=>this.data = data)
      return {
        data:{}
      }
    }
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
