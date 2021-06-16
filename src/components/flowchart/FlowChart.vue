<template>
  <div class="flowchart">
  
    <div class="menu-header">
      <button class="btn-toolbar"
        @click="saveFlowchart()"
        title="Salvar">
        <img src="@/assets/icons/save.png" alt="Salvar" />
      </button>

      <button class="btn-toolbar"
        @click="trySimulation()"
        title="Calcular" >
        <img src="@/assets/icons/play.png" alt="Calcular">
      </button>

      <span class="menu-divisor"></span>

      <button class="btn-toolbar" 
        title="Caixa de Insumo"
        @click="() => factoryCtr(this.typesNodes.InputBox).setNewNode(this.openDialog)">
        <img src="../../assets/icons/inputBox.svg" alt="" srcset=""/>
      </button>

      <button class="btn-toolbar" 
        title="Porcentagem de Saída"
        @click="() => factoryCtr(this.typesNodes.PercentageEntry).setNewNode(this.openDialog)">
        <img src="../../assets/icons/percentageEntry.svg" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Area"
        @click="() => factoryCtr(this.typesNodes.Area).setNewNode(this.openDialog)">
        <img src="../../assets/icons/area.svg" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Circulo"
        @click="() => factoryCtr(this.typesNodes.Circle).setNewNode()">
        <img src="../../assets/icons/circle.svg" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Linha"
        @click="() => factoryCtr(this.typesNodes.Line).setNewNode()">
        <img src="../../assets/icons/line.svg" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Caixa de Texto"
        @click="() => factoryCtr(this.typesNodes.BoxText).setNewNode(this.openDialog)">
        <img src="../../assets/icons/boxText.svg" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Texto"
        @click="() => factoryCtr(this.typesNodes.Text).setNewNode(this.openDialog)">
        <img src="../../assets/icons/Text.png" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Triângulo"
        @click="() => factoryCtr(this.typesNodes.Triangle).setNewNode(this.openDialog)">
        <img src="../../assets/icons/triangle.png" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="On-Off"
        @click="() => factoryCtr(this.typesNodes.OnOff).setNewNode(this.openDialog)">
        <img src="../../assets/icons/onOff.png" alt="" srcset=""/>
      </button>

      <button 
        class="btn-toolbar" 
        title="Valores"
        @click="() => factoryCtr(this.typesNodes.TokenValue).setNewNode(this.openDialog)">
        <img src="../../assets/icons/tokenValue.png" alt="" srcset=""/>
      </button>
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

  components: { Dialog },
  
  inject: ['switchBar'],
  provide(){
    return {}
  },

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

    async saveFlowchart(){
      this.switchBar();
      let nodes = SingletonFlowchart.Memory.getNodesToSave();
      let areas = new Array()
      let input = nodes.find(n => n.type == this.typesNodes.InputBox);

      nodes.forEach(n => {
        if(n.type == this.typesNodes.Area)
          areas.push({ 
            id: n.idName, 
            nameOfArea: n.nameOfArea, 
            value: n.link.value,
            unitmensurement: input.unitmensurement
          });
      });
      //console.log('Salvar :>> ', nodes);

      let flowchart = {
        id: 1050,
        flowchartStructure: JSON.stringify(nodes)
      }

      let susccess = true;

      //console.log('FlowChart :>> ', flowchart);
      //console.log('Areas :>> ', areas);
      await axios.post(`${HttpApiNode}`, flowchart)
        .catch(() => { susccess = false })

      await axios.post(`${HttpApiNode}/addareas`, areas)
        .catch(() => { susccess = false })

      if(susccess)
        RequestSuscess("Sucesso na incersão!")
      else
        RequestError("Ops... Aconteceu alguma coisa ao inserir os dados.")
        
      this.switchBar();
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

    async loadDatabaseNodes(){
      await axios.get(`${HttpApiNode}`).then(this.hasNode).catch(RequestError);
      this.switchBar();
      this.showMenu = true;
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
      //console.log('Nodes :>> ', SingletonFlowchart.Memory.memory);
      console.log(`${nodes.length} elementos carregados!`)
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

.flowchart {
  display: grid;
  grid-template-rows: 30px 1fr;

}

.menu-header {
  grid-row-start: 1;
  justify-self: flex-start;
}

.menu-divisor{
  margin: 0 2px 0 4px;
  border-right: 2px solid #0009;
  vertical-align: middle;
  font-size: 1.55rem;
}

#canvas {
  grid-row-start: 2;
}

#svg {
  border-radius: 5px;
  width: 100%;
  height: 520px;
}

.selected{
  border: 3px solid #222;
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

.btn-toolbar{
  justify-content: start;
  border-radius: 4px;
  background-color:dodgerblue;
  margin: 0 0 0 2px;
  cursor: pointer;
}

.btn-toolbar > img{
  width: 20px;
}

</style>
