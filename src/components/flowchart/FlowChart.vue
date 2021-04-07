<template>
  <div>
    <md-button
      id="btn-plus1"
      @click="openToolbar()"
      class="md-fab md-mini md-primary"
    >
      <md-icon>+</md-icon>
    </md-button>
    <md-button
      id="btn-plus2"
      @click="removeNode()"
      class="md-fab md-mini md-accent"
    >
      <md-icon>-</md-icon>
    </md-button>

    <div class="toolbar">

      <md-button class="btn-toolbar" @click="() => ctrInputBox.setNewNode(this.openDialog)"><md-icon><img src="../../assets/inputBox.svg" alt="" srcset=""/></md-icon>
        Caixa de Insumo
      </md-button>

      <md-button class="btn-toolbar" @click="() => ctrPercentageEntry.setNewNode(this.openDialog)"><md-icon><img src="../../assets/percentageEntry.svg" alt="" srcset=""/></md-icon>
        Porcentagem de Saída
      </md-button>

      <md-button class="btn-toolbar" @click="() => ctrArea.setNewNode(this.openDialog)"><md-icon><img src="../../assets/area.svg" alt="" srcset=""/></md-icon>
        Area
      </md-button>

      <md-button class="btn-toolbar" @click="() => ctrCircle.setNewNode()"><md-icon><img src="../../assets/circle.svg" alt="" srcset=""/></md-icon>
        Circulo
      </md-button>

      <md-button class="btn-toolbar" @click="() => ctrLine.setNewNode()"><md-icon><img src="../../assets/line.svg" alt="" srcset=""/></md-icon>
        Linha
      </md-button>

      <md-button class="btn-toolbar" @click="() => ctrBoxText.setNewNode(this.openDialog)"><md-icon><img src="../../assets/boxText.svg" alt="" srcset=""/></md-icon>
        BoxText
      </md-button>

    </div>
    <div id="canvas" 
    @mousedown="startSelection($event)"
    @mousemove="moveSelection($event)"
    @mouseup="endSelection($event)"></div>
    <Dialog
      :dialogVisible="showDialog"
      :node="selectedNode"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import { SingletonFlowchart } from "./nodes/_service/singletonFlowchart";
import { GetNewController } from "./nodes/_service/factoryController";
import { Types } from "./utils/nodeTypes"
import Dialog from './Dialog.vue';

export default {
  components: { Dialog },
  name: "FlowChart",

  data() {
    return {
      toolbarClosed: true,
      typesNodes: new Types(),
      showDialog: 0,
      selectedNode: null,
      ctrSelection: null,
      ctrInputLine: null,
      ctrPercentageEntry: null,
      ctrBoxText: null,
      ctrCircle: null,
      ctrLine: null,
      ctrArea: null,
    };
  },
  watch: {},
  methods: {
    async startSelection(event){
      if(event.ctrlKey){
        this.ctrSelection.onSelection = true
        await this.ctrSelection.setNewNode(event);
      }
    },

    moveSelection(event){
      if(event.ctrlKey){
        this.ctrSelection.moveSelectionTo(event);
      }
    },

    endSelection(event){
      if(event.ctrlKey){
        this.ctrSelection.selectNodes();
      }
    },

    openDialog(node){
      this.selectedNode = node
      this.showDialog++;
    },

    removeNode() {
      let selection = SingletonFlowchart.selected
      if(selection){
        SingletonFlowchart.unSelectNode();
        d3.selectAll(`#${selection}`).remove()
      }
    },

    unSelected(){
      this.toolbarClosed = false;
      SingletonFlowchart.unSelectNode();
      this.openToolbar()
    },

    configSVG(){
      let that = this
      d3.select("#canvas").call(d3.drag().on('end',function(){ that.unSelected() })).append("svg");
          let svg = d3
            .select("svg")
            .attr("id", "svg")

          SingletonFlowchart.svg = svg;
    },

    initializaControllers(){
      this.ctrInputBox = GetNewController(this.typesNodes.InputBox);
      this.ctrPercentageEntry = GetNewController(this.typesNodes.PercentageEntry);
      this.ctrBoxText = GetNewController(this.typesNodes.BoxText);
      this.ctrCircle = GetNewController(this.typesNodes.Circle);
      this.ctrLine = GetNewController(this.typesNodes.Line);
      this.ctrArea = GetNewController(this.typesNodes.Area);
      this.ctrSelection = GetNewController(this.typesNodes.Selection);
    },

    setShortCuts(){
      let that = this
      document.onkeydown = function (event) {
        switch (event.key) {
          case 'Delete':
            that.removeNode();
            break;
          default:
            break;
        }
      }
    },

    openToolbar() {
      if (this.toolbarClosed) {
        document.querySelector(".toolbar").style["max-width"] = "100%";
        document.querySelector(".toolbar").style["max-height"] = "100%";
      } else {
        document.querySelector(".toolbar").style["max-width"] = "0px";
        document.querySelector(".toolbar").style["max-height"] = "0px";
      }
      this.toolbarClosed = !this.toolbarClosed;
    },
  },

  mounted() {
    this.configSVG();
    this.initializaControllers();
    this.setShortCuts();
  }
};
</script>

<style src="./nodes/boxText/boxText.css"></style>
<style src="./nodes/connection/connection.css"></style>

<style>

#svg {
  background-color: rgb(218, 232, 233);
  border-radius: 5px;
  width: 800px;
  height: 500px;
}

.selected{
  border: 3px solid #222;
}

#btn-plus1 {
  position: fixed;
  top: 100px;
  left: 50px;
}

.toolbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(240, 240, 240);
  position: absolute;
  top: 120px;
  left: 100px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #2228;
  max-width: 0;
  max-height: 0;
  transition-duration: 0.5s;
}

#btn-plus2 {
  position: fixed;
  top: 150px;
  left: 58px;
}
#btn-plus3 {
  position: fixed;
  top: 200px;
  left: 58px;
}

#btn-plus i {
  font-weight: 900;
}

#btn-plus:hover {
  box-shadow: 1px 1px 1px #fff;
}

.toolbar div {
  color: #222;
  font-weight: 700;
}

.toolbar >.md-button.btn-toolbar>.md-ripple {
  justify-content: start;
}

.toolbar > button {
  margin: 0;
  width: 100%;
  padding: 0 10px 0 5px;
  font-size: 10px;
}

.toolbar > button:hover {
  background-image: linear-gradient(to right, #2c3e3a30, white);
  border-bottom: 1px solid #2c3e3a;
}
</style>
