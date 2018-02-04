import Vue from 'vue'
import './components'
import router from './router'
const app = new Vue({
  el: 'body .container',
  data: {
    message: "Hello Vue!"
  },
  router
})
