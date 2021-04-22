<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Nome da área</label>
        <md-input v-model="title"></md-input>
      </md-field>

      <span><hr></span>

      <md-table v-if="table.length > 0" class="table">
        <md-table-row>
          <md-table-head>ID</md-table-head>
          <md-table-head>Conexão</md-table-head>
          <md-table-head>Entrada</md-table-head>
          <md-table-head>Saida</md-table-head>
        </md-table-row>
        <md-table-row v-for="n in table" :key="n.id">
          <md-table-cell>{{ n.id }}</md-table-cell>
          <md-table-cell>{{ n.description }}</md-table-cell>
          <md-table-cell>
            <md-checkbox v-model="n.in" :disabled="n.out" class="md-primary" />
          </md-table-cell>
          <md-table-cell>
            <md-checkbox v-model="n.out" :disabled="n.in || n.isInputBox" class="md-primary" />
          </md-table-cell>
        </md-table-row>
      </md-table>

    </form>
  </div>
</template>

<script>
import { SingletonFlowchart } from '../nodes/_service/singletonFlowchart';
import { Types } from '../utils/nodeTypes';
  export default {
    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       title: this.node.nameOfArea,
       boolean: false,
       table: []
      }
    },

    methods: {
      loadNodesNear() {
        let types = new Types();
        let nodesEntries = [types.InputBox, types.PercentageEntry]
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)
        nodesNear = nodesNear.filter(obj => nodesEntries.includes(obj.node.type))
        nodesNear.forEach(obj => {
          this.table.push({
            id: obj.node.id,
            description: types.Caption[obj.node.type] + ": " + obj.node.value,
            in: obj.node.linked.in,
            out: obj.node.linked.out,
            isInputBox: types.InputBox == obj.node.type
          })
        })
        this.node.nodesConnected = this.table;
      }
    },

    watch:{
      title(){
        this.node.nameOfArea = this.title;
      }
    },

    mounted(){ 
      this.loadNodesNear();
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

.table {
  
}

</style>