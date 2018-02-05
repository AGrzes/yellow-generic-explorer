import Vue from 'vue'
import {label,identity} from '../metadata'
Vue.component('yellow-entity-link', {
  template: `<router-link :to="{ name: 'item', params: { key: key }}">{{label}}</router-link>`,
  props: {
    entity: {
      type: Object,
      required: true
    }
  },
  computed: {
    label(){
      return label(this.entity)
    },
    key(){
      return identity(this.entity)
    }
  }
})
