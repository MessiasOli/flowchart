import Vue from "vue";
import VueRouter from 'vue-router';

import Flowchart from '../components/flowchart/FlowChart.vue'
import Area from '../components/templates/Area.vue'

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Flowchart
  },
  {
    path: "*",
    redirect: "/"
  },
  {
    name: 'area',
    path: '/area',
    component: Area
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;