import Vue from 'vue'
import _ from 'lodash'
import {attributes,relations} from '../metadata'
Vue.component('yellow-entity-details', {
  template: `<div class="card">
    <div class="card-body">
      <div class="row" v-for="attribute in attributes">
        <label class="col-2 text-right">{{attribute.label}}</label>
        <div class="col-10">{{attribute.value}}</div>
      </div>
      <div class="row" v-for="relation in relations">
        <label class="col-2 text-right">{{relation.label}}</label>
        <div class="col-10"><yellow-entity-link :entity="relation.entity"></yellow-entity-link></div>
      </div>  
    </div>  
  </div>`,
  props: {
    entity: {
      type: Object,
      required: true
    },
  },
  computed: {
    attributes() {
      return attributes(this.entity)
    },
    relations() {
      return relations(this.entity)
    }
  }
})
