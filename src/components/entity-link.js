import Vue from 'vue'
Vue.component('yellow-entity-link', {
  template: `<router-link :to="{ name: 'item', params: { key: entity.key }}">{{entity.name}}</router-link>`,
  props: {
    entity: {
      type: Object,
      required: true
    },
  }
})
