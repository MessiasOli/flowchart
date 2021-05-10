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
          <md-table-head>Saida</md-table-head>
        </md-table-row>
        <md-table-row v-for="n in table" :key="n.id">
          <md-table-cell>{{ n.id }}</md-table-cell>
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
        console.log('nodesNear :>> ', nodesNear);
        nodesNear.forEach(obj => {
          this.table.push({
            description: types.Caption[obj.node.type] + ": " + obj.node.value,
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
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