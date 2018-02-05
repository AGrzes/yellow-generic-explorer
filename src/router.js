import Vue from 'vue'
import VueRouter from 'vue-router'
import gatData from './data'
import _ from 'lodash'
import expr from 'expression-eval'
Vue.use(VueRouter)
const routes = [{
  name: 'list',
  path: '/list',
  component: {
    template: `<div>
      <div class="row">
        <input v-model="filter" type="text" placeholder="Filter" class="col-12">
      </input>
      </div>
      <div class="row">
        <div class="col-3">
          <yellow-link-list :items="items"></yellow-link-list>
        </div>
        <div class="col-9">
          <router-view></router-view>
        </div>
      </div>
    </div>`,
    data(){
      gatData.then((data)=>this.data = data)
      return {
        data:null,
        filter:''
      }
    },
    computed:{
      items(){
        if (this.data){
          if (this.filterMethod){
            return _.filter(this.data.items,(item)=>this.filterMethod(item))
          } else {
            return this.data.items
          }
        }
      },
      filterMethod(){
        if (this.filter){
          try {
            return expr.compile(this.filter)
          } catch(e) {
            console.error(e)
          }
        }
      }
    },
   
  },
  children: [{
    name: 'item',
    path: ':key',
    component: {
      template: `<yellow-entity-details :entity="entity"></yellow-entity-details>`,
      beforeRouteEnter (to, from, next) {
        gatData.then((data) => {
          next(vm => vm.entity = data.find(to.params.key))
        })
      },
      beforeRouteUpdate(to, from, next) {
        gatData.then((data) => {
          this.entity = data.find(to.params.key)
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
