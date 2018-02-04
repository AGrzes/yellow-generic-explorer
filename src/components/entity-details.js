import Vue from 'vue'
import _ from 'lodash'
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
      return _(Object.getOwnPropertyNames(this.entity)).filter((name) => !_.startsWith(name, '@') && name !== '__ob__').map((name) => ({
        name,
        label: _.startCase(name),
        value: this.entity[name]
      })).value()
    },
    relations() {
      return _(Object.getOwnPropertyNames(this.entity)).filter((name) => _.startsWith(name, '@') && name !== '__ob__').map((name) => ({
        name,
        label: _.startCase(name),
        entity: this.entity[name]
      })).value()
    }
  }
})
