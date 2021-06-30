import Vue from "vue";
import VueRouter from 'vue-router';

import Home from '../components/templates/Home.vue'
import Flowchart from '../components/flowchart/FlowChart.vue'
import RegisterInput from '../components/RegisterInput.vue'
import BillOfMaterial from "../components/BillOfMaterial.vue"

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/home',
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
  {
    name:"BillOfMaterial",
    path:"/billofmaterial",
    component: BillOfMaterial
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;