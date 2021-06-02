import Vue from "vue";
import VueRouter from 'vue-router';

import Home from '../components/templates/Home.vue'
import Flowchart from '../components/flowchart/FlowChart.vue'
import Area from '../components/templates/Area.vue'
import TokenValue from '../components/templates/TokenValue.vue'
import InputValue from '../components/templates/inputValue.vue'

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    path: "*",
    redirect: "/"
  },
  {
    name: 'flowchart',
    path: '/flowchart',
    component: Flowchart
  },
  {
    name: 'area',
    path: '/area',
    component: Area
  },
  {
    name: 'tokenValue',
    path: '/tokenvalue',
    component: TokenValue
  },
  {
    name: 'InputValue',
    path: '/InputValue',
    component: InputValue
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;