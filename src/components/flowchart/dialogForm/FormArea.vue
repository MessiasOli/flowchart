<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Nome da área</label>
        <md-input ref="input" v-model="title"></md-input>
      </md-field>

      <span><hr></span>
      <span  class="input-group" v-if="inputs.length > 0">
        <label>Entradas</label>
        <span class="inputs">
          <InputValue
            v-for="n in inputs" :key="n.id"
            :id="n.id"
            :inputValue="n.value" 
            :linked="n.linked"
            @edited="percentage = $event"
            @switchLink="changeLink = $event"
          /> 
        </span>
        <label>
          Total: <strong >{{ total || '0,00'}} %</strong>
          <img id="attention" src="@/assets/icons/ok.png" alt="Status Total">
        </label>
      </span>

    </form>
  </div>
</template>

<script>
import InputValue from '../../templates/inputValue'
import { SingletonFlowchart } from '../nodes/_service/singletonFlowchart';
import { Types } from '../utils/nodeTypes';
import { ParseNumber, NumberFormat } from '../utils/tools'
  export default {
    props: {
      node: {
        type: Object,
        default: null
      },
      action: { type: Function }
    },

    components: { 
      InputValue,
    },

    data() {
      return {
       title: this.node.nameOfArea,
       boolean: false,
       inputs: [],
       percentage: 0,
       changeLink: false,
       total: 0
      }
    },

    watch:{
      title(){
        this.node.nameOfArea = this.title;
      },

      percentage(obj){
        let objSelected = this.inputs.find(n => n.id == obj.id)
        objSelected.value = obj.value;
        this.$emit("action", { node: objSelected.node, value: obj.value });
        this.calculateTotal();
      },

      changeLink(obj){
        let objSelected = this.inputs.find(n => n.id == obj.id)
        objSelected.linked = obj.link
        this.linkNode(objSelected.node, obj.link)
        this.calculateTotal();
      }
    },

    methods: {
      linkNode(node, link){
        if (!this.node.nodesConnected) this.node.nodesConnected = new Array();
        if (!this.node.nodesDesconnected) this.node.nodesDesconnected = new Array();

        if(link)
          this.node.nodesConnected.push(node.link)
        else{
          this.node.nodesConnected = this.node.nodesConnected.filter(link => link.id != node.link.id)  
          this.node.nodesDesconnected.push(node.link);
        }
      },

      loadNodesNear() {
        let types = new Types();
        let nodesEntries = [types.PercentageEntry]
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)

        nodesNear = nodesNear.filter(obj => {
          if(nodesEntries.includes(obj.node.type)){
            if(obj.node.link.in.length == 0){
              return true;
            }
            if(obj.node.link.in.includes(this.node.id)){
              return true;
            }
            return false;
          }
        })
        nodesNear.forEach(obj => {
          this.inputs.push({
            id: obj.node.id,
            description: types.Caption[obj.node.type],
            value: ParseNumber(obj.node.value),
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
      },

      calculateTotal(){
        let total = 0.00
        this.inputs.forEach(obj => {
          if(obj.linked){
            total += ParseNumber(obj.value)
          }
        })
        this.total = NumberFormat(total)
        this.decorateTotal(total)
      },

      decorateTotal(total){
        if(!this.inputs.length)
          return

        let srcImg = ''
        if(total > 100)
          srcImg = require("@/assets/icons/error.png")
        else if(total < 100)
          srcImg = require("@/assets/icons/attention.png")
        else
          srcImg = require("@/assets/icons/ok.png");

        setTimeout(()=> document.querySelector('#attention').src = srcImg, 50);
      }
    },

    mounted(){ 
      this.loadNodesNear();
      this.calculateTotal();
      this.$refs.input.$el.select();
    }
  }
</script>

<style scoped>
form{
  padding: 10px;
  color: #0009;
  display: flex;
  flex-direction: column;
}

.input-group{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.inputs{
  display: flex;
  width: 300px;
  flex-flow: row wrap;
  justify-content: flex-start;
}

#attention{
  vertical-align: sub;
  margin-left: 5px;
  width: 18px;
  height: 18px;
}

</style>