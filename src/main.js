import Vue from 'vue'
import App from './App.vue'

import './config/material'
import './config/snackbar'
import './config/axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
