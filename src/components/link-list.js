import Vue from 'vue'
Vue.component('yellow-link-list', {
  template: `<div class="list-group">
      <yellow-entity-link class="list-group-item list-group-item-action" v-for="item in items" active-class="active" :entity="item"></yellow-entity-link>
  </div>`,
  props: {
    items: {
      type: Array,
      required: false
    },
  }
})
