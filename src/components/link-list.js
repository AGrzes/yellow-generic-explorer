import Vue from 'vue'
Vue.component('yellow-link-list', {
  template: `<ul>
    <li v-for="item in items">
      <yellow-entity-link :entity="item"></yellow-entity-link>
    </li>
  </ul>`,
  props: {
    items: {
      type: Array,
      required: false
    },
  }
})
