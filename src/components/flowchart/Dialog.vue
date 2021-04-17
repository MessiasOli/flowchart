<template>
  <div v-if="showDialog" @dragend="dragAndDrop" class="dialog">
    
    <div draggable="true" class="header">
      <h2>{{ header || "Caixa de dialogo" }}</h2>
    </div>

    <div class="body">
      <FormArea v-if="node.type == types.Area" :node.sync="nodeEdited" />
      <FormInputBox v-if="node.type == types.InputBox" :node.sync="nodeEdited" />
      <FormPercentageEntry v-if="node.type == types.PercentageEntry" :node.sync="nodeEdited" />
      <FormBoxText v-if="node.type == types.BoxText" :node.sync="nodeEdited" />
      <FormText v-if="node.type == types.Text" :node.sync="nodeEdited" />
    </div>
    
    <div class="footer">
      <md-button @click="saveNode" class="md-raised md-primary">Aceitar</md-button>
      <md-button @click="closeDialog" class="md-raised md-accent">Cancelar</md-button>
    </div>

  </div>
</template>

<script>
import FormArea from "./dialogForm/FormArea";
import FormInputBox from "./dialogForm/FormInputBox";
import FormPercentageEntry from "./dialogForm/FormPercentageEntry";
import FormBoxText from "./dialogForm/FormBoxText";
import FormText from "./dialogForm/FormText"
import { Types } from "./utils/nodeTypes"
import { SingletonFlowchart } from './nodes/_service/singletonFlowchart';


  export default {
    name: "Dialog",
    components: { 
      FormArea, 
      FormInputBox, 
      FormPercentageEntry, 
      FormBoxText,
      FormText
    },
    props: {
      node: {
        type: Object,
        default: null
      },
      dialogVisible: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        types: new Types(),
        header: "",
        showDialog: false,
        nodeEdited: null,
      }
    },

    watch:{
      dialogVisible(){
        this.header = this.types.Caption[this.node.type];
        this.nodeEdited = this.node;
        console.log('this.header :>> ', this.header);
        this.showDialog = true;
      }
    },

    methods: {
      saveNode(){
        this.node.update(this.nodeEdited);
        SingletonFlowchart.SaveStatus();
        this.showDialog = false;
      },

      closeDialog(){
        this.showDialog = false;
      },

      dragAndDrop(ev){
        ev.preventDefault();
        let div = document.querySelector('.dialog')
        div.style.top = ev.clientY - div.offsetHeight/2 + 'px'
        div.style.left = ev.clientX - div.offsetWidth / 2 + 'px'
      },

    },
    mounted() {

    }
  }
</script>

<style scoped>
.dialog{
  display: grid;

  position: absolute;
  top: 20%;
  left: calc(50% - 150px);
  min-width: 300px;
  background-color: #fff;

  border-radius: 7px;
  box-shadow: 2px 2px 2px #0004;
}

.header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding-left: 20px;
  border-bottom: 1px solid #0005;
  color: #0008;
  cursor: all-scroll;
}

.footer {
  margin-top: 10px;
  border-top: 1px solid #0005;
  display: flex;
  justify-content: flex-end;
}

</style>