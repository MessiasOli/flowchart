<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor desejado</label>
        <md-input ref='input' v-model="value" type="number"></md-input>
      </md-field>

      <md-field>
        <label>Unidade de medida</label>
        <md-input ref="input" v-model="unitmensurement"></md-input>
      </md-field>

      <span><hr></span>

      <div class="selection" v-if="areas.length > 0">
        <label>Areas:</label><br>
        <span class="areas">
          <Area 
            v-for="n in areas" :key="n.id"
            class="area"
            :id= n.node.id
            :name= n.description
            :activated= n.linked
            @click="() => { linkNode(n.node, n.linked) }"
          />
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import Area from "../../templates/Area"
import FormMixin from "./_FormMixin"
import { SingletonFlowchart } from "../nodes/_service/singletonFlowchart"
import { Types } from '../utils/nodeTypes';
import { ParseNumber } from '../utils/tools'

  export default {
    components:{
      Area,
    },

    mixins: [ FormMixin ],

    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       value: ParseNumber(this.node.link.value),
       unitmensurement: this.node.unitmensurement,
       areas: [],
       checked: true,
      }
    },

    watch:{
      value(){
        this.node.link.value = this.value;
      },

      unitmensurement(){
        this.node.unitmensurement = this.unitmensurement;
      },
    },

    methods: {
      linkNode(node, link){
        console.log('link :>> ', link);
        if (!this.node.nodesConnected) this.node.nodesConnected = new Array();
        if (!this.node.nodesDesconnected) this.node.nodesDesconnected = new Array();

        if(link){
          console.log(true)
          this.node.nodesConnected.push(node.link)
        }else{
          console.log(false)
          this.node.nodesConnected = this.node.nodesConnected.filter(link => link.id != node.link.id)  
          this.node.nodesDesconnected.push(node.link);
        }
      },

      loadNodesNear() {
        let types = new Types();
        let nodesEntries = [types.Area]
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)
        nodesNear = nodesNear.filter(obj => nodesEntries.includes(obj.node.type))
        nodesNear.forEach(obj => {
          this.areas.push({
            id: obj.node.id,
            description: obj.node.nameOfArea,
            node: obj.node,
            linked: this.node.link.out.includes(obj.node.id)
          })
        })
      }
    },

    mounted(){ 
      this.loadNodesNear();
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

.selection>label{
  float: left;
}

.areas, .values {
  display: flex;
  width: 350px;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.else{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.else>span{
  margin: 5px;
}
</style>