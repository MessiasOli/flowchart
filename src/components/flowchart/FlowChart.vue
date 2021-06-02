<template>
  <div>
    <!-- <md-button
      id="btn-plus1"
      @click="openToolbar()"
      class="md-fab md-mini md-primary"
      title="Adicionar elemento"
    >
      <md-icon>+</md-icon>
    </md-button> -->

    <!-- <md-button
      id="btn-save"
      @click="saveFlowchart()"
      class="md-fab md-mini md-primary"
      title="Salvar"
    >
      <md-icon>
        <img src="@/assets/icons/save.png" alt="Salvar" />
      </md-icon>
    </md-button> -->

    <!-- <md-button
      id="btn-play"
      @click="trySimulation()"
      class="md-fab md-mini md-plain"
      title="Calcular" 
    >
      <md-icon>
        <img src="@/assets/icons/play.png" alt="Calcular">
      </md-icon>
    </md-button> -->

    <div class="toolbar">

      <md-button class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.InputBox).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/inputBox.svg" alt="" srcset=""/></md-icon>
        Caixa de Insumo
      </md-button>

      <md-button class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.PercentageEntry).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/percentageEntry.svg" alt="" srcset=""/></md-icon>
        Porcentagem de Saída
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.Area).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/area.svg" alt="" srcset=""/></md-icon>
        Area
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.Circle).setNewNode()">
      <md-icon><img src="../../assets/icons/circle.svg" alt="" srcset=""/></md-icon>
        Circulo
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.Line).setNewNode()">
      <md-icon><img src="../../assets/icons/line.svg" alt="" srcset=""/></md-icon>
        Linha
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.BoxText).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/boxText.svg" alt="" srcset=""/></md-icon>
        Caixa de Texto
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.Text).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/Text.png" alt="" srcset=""/></md-icon>
        Texto
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.Triangle).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/triangle.png" alt="" srcset=""/></md-icon>
        Triângulo
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.OnOff).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/onOff.png" alt="" srcset=""/></md-icon>
        On-Off
      </md-button>

      <md-button 
      class="btn-toolbar" 
      @click="() => factoryCtr(this.typesNodes.TokenValue).setNewNode(this.openDialog)">
      <md-icon><img src="../../assets/icons/tokenValue.png" alt="" srcset=""/></md-icon>
        Valores
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
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import { HttpApiNode,  RequestSuscess, RequestError } from "../../utils/global"
import { SingletonFlowchart } from "./nodes/_service/singletonFlowchart";
import { Simulation } from "./nodes/_service/simulation";
import { GetNewController } from "./nodes/_service/factoryController";
import { Selection } from "./nodes/_service/selectionService"
import { ShortCuts } from "./utils/shortCuts"
import { Types } from "./utils/nodeTypes"
import { clearStorage } from "./nodes/_service/undoRedo"
import Dialog from './Dialog.vue';

export default {
  name: "FlowChart",
  components: { Dialog},
  inject: ['switchBar'],
  data() {
    return {
      typesNodes: new Types(),
      selectionArea: new Selection(),
      toolbarClosed: true,
      loading: true,
      showDialog: 0,
      nodeRefToDialog: null,
      factoryCtr: GetNewController
    };
  },
  watch: {},
  methods: {
    trySimulation(){
      console.log("Simulando...")
      let execute = new Simulation()
      execute.validateFlowsheet();
    },

    openDialog(node){
      SingletonFlowchart.unSelectNode();
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
      let selected = SingletonFlowchart.selectedNodes
      if(selection || selected){
        d3.selectAll(`.SelectionNode`).remove();
        SingletonFlowchart.removeNodeSelected();
      }
    },

    unSelected(){
      console.log('unselected :>> ');
      SingletonFlowchart.unSelectNode();
      this.selectionArea.cancelSelection();
      this.toolbarClosed = false;
      this.openToolbar()
    },

    configSVG(){
      let that = this
      let svg = d3.select("#canvas").call(d3.drag().on('end',function(){ that.unSelected() }))
        .append("svg")
          .attr("id", "svg")
          .call(d3.zoom().on("zoom", function(event) {
            svg.attr("transform", event.transform).node();
          }))
          .on("dblclick.zoom", null)
        .append("g")
          .attr("id", "board")

      SingletonFlowchart.svg = svg;
      clearStorage();
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

    async loadNodes(data){
      let nodes = JSON.parse(data[0].flowchartStructure)
      await nodes.forEach(node => {
        let ctr = this.factoryCtr(node.type)
        ctr.loadNode(node, this.openDialog)
      });
      RequestSuscess("Sistema carregado");
      console.log('Nodes :>> ', SingletonFlowchart.Memory.memory);
      console.log(`${nodes.length} elementos carregados!`)
      this.switchBar();
      SingletonFlowchart.SaveStatus();
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
    this.switchBar();
    this.configSVG();
    await this.loadDatabaseNodes();
    ShortCuts.Init(this);
  }
};
</script>

<style src="./nodes/boxText/boxText.css"></style>
<style src="./nodes/connection/connection.css"></style>

<style>

#svg {
  border-radius: 5px;
  width: 100%;
  height: 520px;
}

.selected{
  border: 3px solid #222;
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

#btn-plus1 {
  position: fixed;
  top: 100px;
  left: 50px;
}

#btn-plus2 {
  position: fixed;
  top: 150px;
  left: 58px;
}

#btn-save {
  position: fixed;
  top: 150px;
  left: 58px;
}

#btn-play {
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
