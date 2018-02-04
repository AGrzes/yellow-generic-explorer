import Vue from 'vue'
import VueRouter from 'vue-router'
import gatData from './data'
import _ from 'lodash'
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
      template: `<yellow-entity-details :entity="entity"></yellow-entity-details>`,
      beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        gatData.then((data) => {
          next(vm => vm.entity = _.find(data.items, _.matchesProperty('key', to.params.key)))
        })
      },
      beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate')
        gatData.then((data) => {
          this.entity = _.find(data.items, _.matchesProperty('key', to.params.key))
          next()
        })
      },
      data(){
        return {
          entity:{}
        }
      }
    }
  }]
}]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
