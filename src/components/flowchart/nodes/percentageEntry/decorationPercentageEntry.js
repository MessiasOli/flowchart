import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../_utils/colors"
import * as d3 from "d3"

export class DecorationPercentageEntry extends DecorationModel {
  constructor() {
    super("DecorationPercentageEntry")
    console.log("DecorationPercentageEntry Criado!");
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
  
       await svg
          .data([node])
          .append("g")
          .classed("PercentageEntry", true)
          .attr("id", `PercentageEntry-${node.id}`)
          

          let g = d3.select(`#PercentageEntry-${node.id}`)

          g.append('text')
          .attr("y", (d) => d.y + node.heightText)
          .attr("x", (d) => d.x + node.width / 2)
          .attr("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style('stoke', COLORS.Black90)
          .text(node.value)
          .node();

          g.append("rect")
          .classed("PercentageEntry", true)
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .attr("cursor", "grab")
          .attr("stroke", COLORS.Blue)
          .style("fill", '#0000')
          .style("width", node.width)
          .style("height", node.height)
          .call(this.setDrag())
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
      SingletonFlowchart.selected = `PercentageEntry-${d.id}`
  
      d3.select(this)
        .attr("stroke", "black")
        .attr("cursor", "grabbing")

    }

    this.dragged = async function (event, d) {
      const adjustY = 5;
      SingletonFlowchart.clicked = false;
      await d3.select(this).raise().attr("x", (d.x = event.x)).attr("y", (d.y = event.y - adjustY));
      await d3.select(`#PercentageEntry-${d.id} > text`).raise().attr("x", (d.x = event.x + d.width / 2)).attr("y", (d.y = event.y + d.heightText - adjustY));
      
    }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("stroke", COLORS.Blue)
        .attr("cursor", "grab") 
    };
  }
}