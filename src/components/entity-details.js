import Vue from 'vue'
import _ from 'lodash'
import {attributes,relations} from '../metadata'
Vue.component('yellow-entity-details', {
  template: `<div class="card">
    <div class="card-body">
      <div class="row" v-for="attribute in attributes">
        <label class="col-2 text-right">{{attribute.label}}</label>
        <div class="col-10">
          <ul v-if="attribute.array" class="list-unstyled">
            <li v-for="value in attribute.value">{{value}}</li>
          </ul>
          <template v-else>{{attribute.value}}</template>
        </div>
      </div>
      <div class="row" v-for="relation in relations">
        <label class="col-2 text-right">{{relation.label}}</label>
        <div class="col-10">          
          <ul v-if="relation.array" class="list-unstyled">
            <li v-for="entity in relation.entity"><yellow-entity-link :entity="entity"></yellow-entity-link></li>
          </ul>
          <template v-else><yellow-entity-link :entity="relation.entity"></yellow-entity-link></template>
        </div>
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
