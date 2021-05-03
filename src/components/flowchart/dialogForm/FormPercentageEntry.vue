<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor de desvio (%)</label>
        <md-input v-model="value" type="number" min="0" max="100"></md-input>
      </md-field>

      <span><hr></span>

      <md-table v-if="table.length > 0" class="table">
        <md-table-row>
          <md-table-head>ID</md-table-head>
          <md-table-head>Conexão</md-table-head>
          <md-table-head>Conectado?</md-table-head>
        </md-table-row>
        <md-table-row v-for="n in table" :key="n.id">
          <md-table-cell>{{ n.id }}</md-table-cell>
          <md-table-cell>{{ n.description }}</md-table-cell>
          <md-table-cell>
            <md-checkbox v-model="n.out" class="md-primary" />
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
       value: this.node.value.replace(",", "."),
       table: []
      }
    },

    methods: {
      loadNodesNear() {
        let types = new Types();
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)
        nodesNear = nodesNear.filter(obj => types.TokenValue == obj.node.type)
        console.log('nodesNear :>> ', nodesNear);
        nodesNear.forEach(obj => {
          this.table.push({
            id: obj.node.id,
            description: types.Caption[obj.node.type] + ": " + obj.node.value,
            out: obj.node.linked.out,
          })
        })
        this.node.nodesConnected = this.table;
      }
    },

    watch:{
      value(){
        this.node.value = this.value > 100 ? 100 : this.value < 0 ? 0 : this.value;
      }
    },

    mounted(){
      this.loadNodesNear()
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