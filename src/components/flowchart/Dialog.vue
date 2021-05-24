<template>
  <div @keyup.enter="saveNode" @keyup.esc="closeDialog" v-if="showDialog" @dragend="dragAndDrop" class="dialog">
    
    <div @keyup.enter="saveNode" @keyup.esc="closeDialog" draggable="true" class="header">
      <h2>{{ header || "Caixa de dialogo" }}</h2>
    </div>

    <div @keyup.enter="saveNode" @keyup.esc="closeDialog" class="body">
      <FormArea v-if="node.type == types.Area" :node.sync="nodeEdited" @action="editValueOfOtherNode=$event"/>
      <FormInputBox v-if="node.type == types.InputBox" :node.sync="nodeEdited" />
      <FormPercentageEntry v-if="node.type == types.PercentageEntry" :node.sync="nodeEdited" />
      <FormBoxText v-if="node.type == types.BoxText" :node.sync="nodeEdited" />
      <FormText v-if="node.type == types.Text" :node.sync="nodeEdited" />
      <FormTriangle v-if="node.type == types.Triangle" :node.sync="nodeEdited" />
      <FormDialog v-if="node.type == types.OnOff" :node.sync="nodeEdited" />
    </div>
    
    <div @keyup.enter="saveNode" @keyup.esc="closeDialog" class="footer">
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
import FormTriangle from "./dialogForm/FormTriangle"
import FormDialog from "./dialogForm/FormOnOff"
import { Types } from "./utils/nodeTypes"
import { SingletonFlowchart } from './nodes/_service/singletonFlowchart';


  export default {
    name: "Dialog",
    components: { 
      FormArea, 
      FormInputBox, 
      FormPercentageEntry, 
      FormBoxText,
      FormText,
      FormTriangle,
      FormDialog
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
        nodesValue: new Array(),
        editValueOfOtherNode: {}
      }
    },

    watch:{
      dialogVisible(){
        this.header = this.types.Caption[this.node.type];
        this.nodeEdited = this.node;
        this.nodesValue = new Array();
        console.log('this.header :>> ', this.header);
        this.showDialog = true;
      },

      editValueOfOtherNode(obj){
        console.log('obj on dialog :>> ', obj);
        let hasNode = this.nodesValue.filter(o => o.node.id == obj.node.id)
        console.log('hasNode :>> ', hasNode);
        if(hasNode.length > 0){
          hasNode.value = obj.value
        }else{
          this.nodesValue.push({ node: obj.node, value: obj.value })
        }
      },
    },

    methods: {
      saveNode(){
        this.node.update(this.nodeEdited);
        this.updateValuesOtherNodes()
        SingletonFlowchart.SaveStatus();
        this.showDialog = false;
      },

      updateValuesOtherNodes(){
        this.nodesValue.forEach(obj => {
          console.log('obj :>> ', obj.value);
          obj.node.value = obj.value;
          console.log('obj :>> ', obj);
          obj.node.update()
        })
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