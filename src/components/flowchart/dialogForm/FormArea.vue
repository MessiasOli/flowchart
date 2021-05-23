<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Nome da área</label>
        <md-input ref="input" v-model="title"></md-input>
      </md-field>

      <span><hr></span>

      <md-table v-if="table.length > 0" class="table">
        <md-table-row>
          <md-table-head>Conexão</md-table-head>
          <md-table-head>Saida</md-table-head>
        </md-table-row>
        <md-table-row 
          v-for="n in table" :key="n.id">
          <md-table-cell
            @click="() => {idSelected = n.id}">
            {{ n.description }}: 
            <Input
              :data="n.node"
              :number="n.value" 
              @edited="percentage = $event"
              msg="Porcentagem" /> 
          </md-table-cell>
          <md-table-cell>
            <input 
              type="checkbox" 
              class="md-primary"
              @click="() => { linkNode(n.node, n.linked) }" 
              v-model="n.linked" 
            />
          </md-table-cell>
        </md-table-row>
      </md-table>

    </form>
  </div>
</template>

<script>
import Input from "../../templates/Input"
import { SingletonFlowchart } from '../nodes/_service/singletonFlowchart';
import { Types } from '../utils/nodeTypes';
import { ParseNumber } from '../utils/tools'
  export default {
    props: {
      node: {
        type: Object,
        default: null
      },
      action: { type: Function }
    },

    components: { 
      Input,
    },

    data() {
      return {
       title: this.node.nameOfArea,
       boolean: false,
       table: [],
       percentage: 0,
      }
    },

    watch:{
      title(){
        this.node.nameOfArea = this.title;
      },

      percentage(obj){
        let value = obj.value > 100 ? 100 : obj.value
        value = value < 0 ? 0 : value;
        this.$emit("action", { node: obj.data, value });
      }
    },

    methods: {
      linkNode(node, link){
        if (!this.node.nodesConnected) this.node.nodesConnected = new Array();
        if (!this.node.nodesDesconnected) this.node.nodesDesconnected = new Array();

        if(!link)
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
          this.table.push({
            id: obj.node.id,
            description: types.Caption[obj.node.type],
            value: ParseNumber(obj.node.value),
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
      }
    },

    mounted(){ 
      this.loadNodesNear();
      this.$refs.input.$el.focus();
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

</style>