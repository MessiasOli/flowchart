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

    
    watch:{
      value(){
        this.node.value = this.value > 100 ? 100 : this.value < 0 ? 0 : this.value;
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
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)

        nodesNear = nodesNear.filter(obj => {
          if(obj.node.type == types.TokenValue){
            if(obj.node.link.in.length == 0){
              return true;
            }
            if(obj.node.link.in.includes(this.node.id)){
              return true;
            }
            return false;
          }

          if(obj.node.type == types.Area){
            if(this.node.link.in.includes(obj.node.id))
              return false

            if(obj.node.link.in.includes(this.node.id)){
              return true;
            }
            return true;
          }
        })
        
        nodesNear.forEach(obj => {
          this.table.push({
            description: `${types.Caption[obj.node.type]} 
                          :  
                          ${obj.node.type == types.TokenValue ? 
                          obj.node.link.value : 
                          obj.node.nameOfArea}`,
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
          console.log('this.table :>> ', this.table);
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