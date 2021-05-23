<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor desejado</label>
        <md-input ref='input' v-model="value" type="number"></md-input>
      </md-field>
      <span><hr></span>

      <md-table v-if="table.length > 0" class="table">
        <md-table-row>
          <md-table-head>Conexão</md-table-head>
          <md-table-head>Vincular</md-table-head>
        </md-table-row>
        <md-table-row v-for="n in table" :key="n.id">
          <md-table-cell>{{ n.description }}</md-table-cell>
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
import { SingletonFlowchart } from "../nodes/_service/singletonFlowchart"
import { Types } from '../utils/nodeTypes';
import { ParseNumber } from '../utils/tools'

  export default {
    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       value: ParseNumber(this.node.link.value),
       table: [],
       checked: true,
      }
    },

    watch:{
      value(){
        this.node.link.value = this.value;
      },
    },

    methods: {
      linkNode(node, link){
        console.log('link :>> ', link);
        if(!link)
        {
          this.node.link.addOut(node.link)
        }
        else
        {
          this.node.link.removeOut(node.link)  
        }
        console.log('this.node :>> ', this.node);
      },

      loadNodesNear() {
        let types = new Types();
        let nodesEntries = [types.Area]
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)
        nodesNear = nodesNear.filter(obj => nodesEntries.includes(obj.node.type))
        nodesNear.forEach(obj => {
          this.table.push({
            description: types.Caption[obj.node.type] + ": " + obj.node.nameOfArea,
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
        this.node.nodesConnected = this.table;
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
}
</style>