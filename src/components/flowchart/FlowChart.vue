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
      @click="editNode()"
      class="md-fab md-mini md-plain"
    >
      <md-icon><img src="../../assets/edit.svg" alt="" srcset=""/></md-icon>
    </md-button>
    <div class="toolbar">

      <md-button @click="addCircle()"><md-icon><img src="../../assets/circle.svg" alt="" srcset=""/></md-icon>
        Circulo
      </md-button>

      <md-button @click="addBoxText()"><md-icon><img src="../../assets/boxText.svg" alt="" srcset=""/></md-icon>
        BoxText
      </md-button>

    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { SingletonFlowchart } from "./nodes/_service/singletonFlowchart";
import { Types, GetNewController } from "./nodes/_service/factoryController";

export default {
  name: "FlowChart",

  data() {
    return {
      toolbarClosed: true,
      typesController: new Types(),
      ctrCircle: null,
      ctrBoxText: null,
    };
  },
  watch: {},
  methods: {
    addCircle() {
      this.ctrCircle.setNewNode();
    },

    addBoxText() {
      this.ctrBoxText.setNewNode();
    },

    removeNode() {
      let selection = SingletonFlowchart.selected
      d3.select(`#${selection}`).remove()
    },

    editNode() {
      console.log("Método edit");
    },

    unSelected(){
      if(!SingletonFlowchart.nodeClicked){
        SingletonFlowchart.selected && d3.select(`#${SingletonFlowchart.selected}`).attr("stroke",null)
      }
      this.toolbarClosed = false;
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
      this.ctrCircle = GetNewController(this.typesController.CircleController);
      this.ctrBoxText = GetNewController(this.typesController.BoxTextController);
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

<style>

#svg {
  background-color: rgb(218, 232, 233);
  border-radius: 5px;
  width: 800px;
  height: 500px;
}

#btn-plus1 {
  position: fixed;
  top: 100px;
  left: 50px;
}

.toolbar {
  display: flex;
  flex-direction: column;
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

.toolbar > button {
  margin: 0;
  padding: 0 10px 0 5px;
  font-size: 10px;
}

.toolbar > button:hover {
  background-image: linear-gradient(to right, #2c3e3a30, white);
  border-bottom: 1px solid #2c3e3a;
}
</style>
