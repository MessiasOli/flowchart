import { DecorationModel } from "../_model/DecorationModel"
import { ControllerCircle } from "../circle/controllerCircle"
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import * as d3 from "d3"

class DecorationCircle extends DecorationModel {
  constructor() {
    super("DecorationCircle")
    this.node = null;
    this.ctr = new ControllerCircle();

    this.init = async function(newNode) {
      let svg = SingletonFlowchart.svg
      this.node = newNode;
  
       await svg
         .data([ newNode ])
         .append("circle")
          .attr("id" , d => d.idName)
          .attr("cx",  d => d.xCircle())
          .attr("cy", d => d.yCircle())
          .attr("r", d => d.radius)
          .attr("cursor", "grab")
          .classed("circle", true)
          .style("fill", d3.schemeCategory10[100 % 10])
          .call(this.setDrag())
      
      return svg
    }

    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", (event, d) => that.dragended(d, that));
      return drag;
    }
  
    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`${d.idName}`);
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }
  
    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false
      d.x = event.x;
      d.y = event.y;
      d3.select(`#${d.idName}`).raise().attr("cx", d.xCircle()).attr("cy", d.yCircle());
    }

    this.move = () => {
      let d = this.node;
      d3.select(`#${d.idName}`).raise().attr("cx", d.xCircle()).attr("cy", d.yCircle());
    }
  
    this.dragended = function(d, that) {
      d3.select(`#${d.idName}`)
        .style("stroke", "none")
        .attr("cursor", "grab")
      that.ctr.updateNode(d)
    }
  }
}

export { DecorationCircle }
