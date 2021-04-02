import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationInputBox extends DecorationModel {
  constructor() {
    super("DecorationInputBox")
    console.log("DecorationInputBox Criado!");
    this.node = null;
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      console.log("newNode :>> ", newNode);
      this.node = newNode;
  
       await svg
          .data([newNode])
          .append("g")
          .classed("InputBox", true)
          .attr("id", `InputBox-${newNode.id}`)

          let g = d3.select(`#InputBox-${newNode.id}`)

          g.append("image")
          .attr('width', newNode.widthImg)
          .attr('height', newNode.heightImg)
          .attr("x", newNode.xImg)
          .attr("y", newNode.yImg)
          .attr("xlink:href", newNode.srcImg)
          .attr("cursor", "grab")
          .call(this.setDrag())
          .on('dblclick', () => openDialog(newNode))
          .node();

          g.append('text')
          .attr("y", (d) => d.y + newNode.heightText)
          .attr("x", newNode.xText())
          .attr("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style('stoke', COLORS.Black90)
          .text(newNode.value)
          .on('dblclick', () => openDialog(newNode))
          .node();

          g.append("rect")
          .classed("InputBox", true)
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .attr("stroke", COLORS.ClearBlue)
          .style("fill", '#0000')
          .style("width", newNode.width)
          .style("height", newNode.height)
          .node();

      
      return svg
    }
  
    this.setDrag = function() {
      let that = this

      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", that.dragended);

      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.clicked = true
      SingletonFlowchart.selected = `InputBox-${d.id}`
  
      console.log('this :>> ', this);

      d3.select(this)
        .attr("cursor", "grabbing")

    }

    this.dragged = async function (event, d) {
      const adjustY = 5;
      const adjustX = 5;
      d.x = event.x;
      d.y = event.y;
      SingletonFlowchart.clicked = false;
      await d3.select(this).raise().attr("x", (d.xImg = event.x - 12 - adjustX)).attr("y", (d.yImg = event.y - 92));
      await d3.select(`#InputBox-${d.id} > rect`).raise().attr("x", (d.x - adjustX)).attr("y", (d.y - adjustY));
      await d3.select(`#InputBox-${d.id} > text`).raise().attr("x", (d.xText() - adjustX)).attr("y", (d.y + d.heightText - adjustY));
      
    }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("stroke", COLORS.ClearBlue)
        .attr("cursor", "grab") 
    };

    this.setTextAndAdjustWidth = () => {
      d3.select(`#InputBox-${this.node.id} > text`)
        .attr("x", this.node.xText() - 5)
        .text(this.node.value)
        .node()

      d3.select(`#InputBox-${this.node.id} > rect`)
        .style("width", this.node.width)
    }
  }
}