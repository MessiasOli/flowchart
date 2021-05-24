<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor de desvio (%)</label>
        <md-input ref="input" v-model="value" type="number" min="0" max="100"></md-input>
      </md-field>

      <span><hr></span>

      <div class="selection" v-if="values.length > 0">
        <label>Valores:</label><br>
        <span class="values">
          <TokenValue
            v-for="n in values" :key="n.id"
            class="value"
            :id= n.node.id
            :name= n.description
            :activated= n.linked
            @click="() => { linkNode(n.node, n.linked) }"
          />
        </span>
      </div>
      <div v-else class="else">
        <label>Valores: </label>
        <span>Não há valores disponíveis para ser vinculado.</span>
      </div>
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
      <div v-else class="else">
        <label>Areas: </label>
        <span>Não há Areas disponíveis para ser vinculado.</span>
      </div>
    </form>
  </div>
</template>

<script>
import Area from "../../templates/Area"
import TokenValue from "../../templates/TokenValue"
import { SingletonFlowchart } from '../nodes/_service/singletonFlowchart';
import { Types } from '../utils/nodeTypes';

  export default {
    components:{
      Area,
      TokenValue
    },

    provide(){
      return{
        changeActive : this.changeActive
      }
    },

    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       value: this.node.value.replace(",", "."),
       areas: [],
       values: [],
      }
    },

    
    watch:{
      value(){
        this.node.value = this.value > 100 ? 100 : this.value < 0 ? 0 : this.value;
      }
    },

    methods: {
      changeActive(id, linked){
        console.log(id, linked)
        let obj =  this.areas.find(obj => obj.node.id == id)
        if(!obj) 
          obj = this.values.find(obj => obj.node.id == id)
        this.linkNode(obj.node, linked)
      },

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
        let nodesNear = SingletonFlowchart.Memory.getNodesNear(this.node.x, this.node.y)

        nodesNear.forEach(obj => {
          if(obj.node.type == types.TokenValue){
            if(obj.node.link.in.length == 0){
              this.values.push({
                id: obj.node.id,
                description: obj.node.link.value,
                node: obj.node,
                linked: this.node.link.out.includes(obj.node.id)
              })
            }
            if(obj.node.link.in.includes(this.node.id)){
              this.values.push({
                id: obj.node.id,
                description: obj.node.link.value,
                node: obj.node,
                linked: this.node.link.out.includes(obj.node.id)
              })
            }

          }

          if(obj.node.type == types.Area){
            if(!this.node.link.in.includes(obj.node.id)){
              this.areas.push({
                id: obj.node.id,
                description: obj.node.nameOfArea,
                node: obj.node,
                linked: this.node.link.out.includes(obj.node.id)
              });
            }
          }
        })
          console.log('this.areas :>> ', this.areas);
      }
    },

    mounted(){
      this.loadNodesNear()
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