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

    <md-button
      id="btn-plus3"
      @click="saveFlowchart()"
      class="md-fab md-mini md-accent"
    >
      <md-icon>S</md-icon>
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
    @mousedown="selectionArea.start($event)"
    @mousemove="selectionArea.move($event)"
    >
    </div>
    
    <Dialog
      :dialogVisible="showDialog"
      :node="nodeRefToDialog"
    />
    <ProgressBarQuery v-if="loading"/>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import { HttpApiNode,  RequestSuscess, RequestError } from "../../utils/global"
import { SingletonFlowchart } from "./nodes/_service/singletonFlowchart";
import { GetNewController } from "./nodes/_service/factoryController";
import { Selection } from "./nodes/_service/selectionService"
import { Types } from "./utils/nodeTypes"
import Dialog from './Dialog.vue';
import ProgressBarQuery from "../ProgressBarQuery"

export default {
  name: "FlowChart",
  components: { Dialog, ProgressBarQuery },

  data() {
    return {
      typesNodes: new Types(),
      selectionArea: new Selection(),
      toolbarClosed: true,
      loading: true,
      showDialog: 0,
      nodeRefToDialog: null,
      ctrPercentageEntry: null,
      ctrBoxText: null,
      ctrCircle: null,
      ctrLine: null,
      ctrArea: null,
    };
  },
  watch: {},
  methods: {
    openDialog(node){
      this.nodeRefToDialog = node
      this.showDialog++;
    },

    saveFlowchart(){
      let nodes = SingletonFlowchart.Memory.getNodesToSave();
      console.log('Salvar :>> ', nodes);

      let flowchart = {
        id: 1050,
        flowchartStructure: JSON.stringify(nodes)
      }
    
      console.log('nodes :>> ', flowchart);
      axios.post(`${HttpApiNode}`, flowchart)
        .then(() => RequestSuscess("Elementos salvos com sucesso!"))
        .catch(() => RequestError("Ops aconteceu algo!"))
    },

    removeNode() {
      let selection = SingletonFlowchart.selected
      if(selection){
        SingletonFlowchart.removeNodeSelected();
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
    },

    loadDatabaseNodes(){
      axios.get(`${HttpApiNode}`).then(this.hasNode).catch(RequestError)
    },

    hasNode(res){
      if(res && res.data.length > 0){
        SingletonFlowchart.Memory.clear()
        this.loadNodes(res.data)
      }
      else
      RequestSuscess("Não há diagrama para ser exibido");
    },

    loadNodes(data){
      let nodes = JSON.parse(data[0].flowchartStructure)
      nodes.forEach(node => {
        switch(node.type){
          case this.typesNodes.Circle:
            this.ctrCircle.loadNode(node);
            break;

          case this.typesNodes.PercentageEntry:
            this.ctrPercentageEntry.loadNode(node, this.openDialog);
            break;

          case this.typesNodes.InputBox:
            this.ctrInputBox.loadNode(node, this.openDialog);
            break;

          case this.typesNodes.Line:
            this.ctrLine.loadNode(node);
            break;

          case this.typesNodes.Area:
            this.ctrArea.loadNode(node, this.openDialog);
            break;
        }
      });
      console.log(`${nodes.length} elementos carregados!`)
    },

    setShortCuts(){
      let that = this
      document.onkeydown = function (event) {

        switch (event.key) {
          case 'Delete':
            that.removeNode();
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

  async mounted() {
    this.configSVG();
    await this.initializaControllers();
    await this.loadDatabaseNodes();
    this.setShortCuts();
    RequestSuscess("Sistema carregado");
    this.loading = false
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

#btn-plus3 {
  position: fixed;
  top: 150px;
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
