import { DecorationModel } from "../_model/DecorationModel"
import { ControllerCircle } from "../circle/controllerCircle"
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import * as d3 from "d3"

class DecorationCircle extends DecorationModel {
  constructor() {
    super("DecorationCircle")
    this.ctr = new ControllerCircle();

    this.init = async function(node) {
      let svg = SingletonFlowchart.svg
  
       await svg
         .data([ node ])
         .append("circle")
          .attr("id" , d => "circle-"+d.id)
          .attr("cx",  d => d.x)
          .attr("cy", d => d.y)
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
      SingletonFlowchart.selectNode(`circle-${d.id}`);
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }
  
    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false
      d.x = event.x;
      d.y = event.y;
      d3.select(`#circle-${d.id}`).raise().attr("cx", d.x).attr("cy", d.y);
    }
  
    this.dragended = function(d, that) {
      d3.select(`#circle-${d.id}`)
        .style("stroke", "none")
        .attr("cursor", "grab")
      console.log('updateNode :>> ', d);
      that.ctr.updateNode(d)
    }
  }
}

export { DecorationCircle }
