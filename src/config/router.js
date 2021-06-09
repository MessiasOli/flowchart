import Vue from "vue";
import VueRouter from 'vue-router';

import Home from '../components/templates/Home.vue'
import Flowchart from '../components/flowchart/FlowChart.vue'
import RegisterInput from '../components/RegisterInput.vue'

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
    name: 'registerInput',
    path: '/registerInput',
    component: RegisterInput
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;