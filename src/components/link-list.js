import Vue from 'vue'
import {identity} from '../metadata'
Vue.component('yellow-link-list', {
  template: `<div class="list-group">
      <yellow-entity-link class="list-group-item list-group-item-action" v-for="item in items" :key="identity(item)" active-class="active" :entity="item"></yellow-entity-link>
  </div>`,
  props: {
    items: {
      type: Array,
      required: false
    },
  },
  methods:{
    identity
  }
})
