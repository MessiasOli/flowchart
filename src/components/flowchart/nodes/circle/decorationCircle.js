import { DecorationModel } from "../_model/DecorationModel"
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import * as d3 from "d3"

class DecorationCircle extends DecorationModel {
  constructor() {
    super("DecorationCircle")
    console.log("DecorationCircle Criado!");

    this.init = async function(node) {
      let svg = SingletonFlowchart.svg
      let radius = 32
  
       await svg
         .data([{ x: 500, y: 300, index: Math.trunc((Math.random()*100))}, { x: 400, y: 200, index: Math.random(0,10) }])
         .append("circle")
          .attr("id" ,"circle-"+node.id)
          .attr("cx",  d => d.x)
          .attr("cy", d => d.y)
          .attr("r", radius)
          .attr("cursor", "grab")
          .classed("circle", true)
          .style("fill", d3.schemeCategory10[100 % 10])
          .call(this.setDrag(node))
          .on("click", this.cliked)
      
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
  
    this.clicked = function(event, d){
      if (event.defaultPrevented) return; // dragged
      d3.select(this).transition()
          .attr("fill", "black")
          .attr("r", 32 * 2)
        .transition()
          .attr("r", 32)
          .attr("fill", d3.schemeCategory10[d.index % 10]);
    }
  
    this.dragstarted = function() {
      SingletonFlowchart.clicked = true
      d3.select(`#${SingletonFlowchart.selected}`).attr("stroke",null)
      SingletonFlowchart.selected = this.id
  
      d3.select(this)
        .attr("stroke", "black")
        .attr("cursor", "grabbing")
    }
  
    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false
      d3.select(this).raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    }
  
    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("cursor", "grab")
    }
  }
}

export { DecorationCircle }
