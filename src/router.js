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
        <div class="col-12">
        <input v-model="filter" type="text" placeholder="Filter" class="form-control">
        </div>
      </input>
      </div>
      <div class="row mt-3">
        <div class="col-3">
          <yellow-link-list :items="items"></yellow-link-list>
        </div>
        <div class="col-9">
          <router-view></router-view>
        </div>
      </div>
    </div>`,
    data(){
      gatData.then((data)=>{
        this.data = data
        this.items = data.items
      })
      return {
        data:null,
        filter:'',
        items:[]
      }
    },
    methods: {
      updateFilter: _.debounce(function (filter) {
        if (filter && filter != '') {
          try {
            const filterMethod = expr.compile(filter)
            this.items = _.filter(this.data.items, (item) => filterMethod(item))
          } catch (e) {
            this.items = this.data.items
          }
        } else {
          this.items = this.data.items
        }
      }, 1000)
    },
    watch:{
      filter(newFilter,oldFilter){
        this.updateFilter(newFilter)
      }
    }
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
  routes,
  linkActiveClass:'active'
})

export default router
