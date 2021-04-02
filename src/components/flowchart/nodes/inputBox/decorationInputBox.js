import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationInputBox extends DecorationModel {
  constructor() {
    super("DecorationInputBox")
    console.log("DecorationInputBox Criado!");
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
      console.log("node :>> ", node);
  
       await svg
          .data([node])
          .append("g")
          .classed("InputBox", true)
          .attr("id", `InputBox-${node.id}`)

          let g = d3.select(`#InputBox-${node.id}`)

          g.append("image")
          .attr('width', node.widthImg)
          .attr('height', node.heightImg)
          .attr("x", node.xImg)
          .attr("y", node.yImg)
          .attr("xlink:href", node.srcImg)
          .attr("cursor", "grab")
          .call(this.setDrag())
          .node();

          g.append('text')
          .attr("y", (d) => d.y + node.heightText)
          .attr("x", (d) => d.x + node.width / 2)
          .attr("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style('stoke', COLORS.Black90)
          .text(node.value)
          .node();

          g.append("rect")
          .classed("InputBox", true)
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .attr("stroke", COLORS.ClearBlue)
          .style("fill", '#0000')
          .style("width", node.width)
          .style("height", node.height)
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
      SingletonFlowchart.clicked = false;
      await d3.select(this).raise().attr("x", (d.xImg = event.x - 12 - adjustX)).attr("y", (d.yImg = event.y - 92));
      await d3.select(`#InputBox-${d.id} > rect`).raise().attr("x", (d.x = event.x - adjustX)).attr("y", (d.y = event.y - adjustY));
      await d3.select(`#InputBox-${d.id} > text`).raise().attr("x", (d.x = event.x + d.width / 2 - adjustX)).attr("y", (d.y = event.y + d.heightText - adjustY));
      
    }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("stroke", COLORS.ClearBlue)
        .attr("cursor", "grab") 
    };
  }
}