import Vue from 'vue'
import _ from 'lodash'
import {attributes,relations} from '../metadata'
Vue.component('yellow-entity-details', {
  template: `<div>
    <div class="row" v-for="attribute in attributes">
      <label class="col-3">{{attribute.label}}</label>
      <div class="col-9">{{attribute.value}}</div>
    </div>
    <div class="row" v-for="relation in relations">
      <label class="col-3">{{relation.label}}</label>
      <div class="col-9"><yellow-entity-link :entity="relation.entity"></yellow-entity-link></div>
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
