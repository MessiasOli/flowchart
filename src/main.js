import Vue from 'vue'
import App from './App.vue'

import './config/material'
import './config/snackbar'
import './config/axios'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
