import Vue from 'vue'
import App from './App.vue'

import {store} from './store/store';

new Vue({
  el: '#app',
  store,

  beforeCreate() {
    //do something before creating vue instance
    store.commit('setSocket', this.$socket);
  },
  render: h => h(App)
})
