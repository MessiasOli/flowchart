import { IDecoration } from "../_interface/IDecoration";
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import * as d3 from "d3"

export class DecorationCircle {
  constructor() {
    IDecoration.Decoration.apply(this, ["DecorationCircle"]);
    console.log("Decoration Criado!");
  }

  static async init(node) {
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
        .style("fill", d => d3.schemeCategory10[d.index % 10])
        .call(this.setDrag(node))
        .on("click", this.cliked)
    
    return svg
  }

  static setDrag() {
    let that = this
    let drag = d3
      .drag()
      .on("start", that.dragstarted)
      .on("drag", that.dragged)
      .on("end", that.dragended);
    return drag;
  }

  static clicked(event, d){
    if (event.defaultPrevented) return; // dragged
    d3.select(this).transition()
        .attr("fill", "black")
        .attr("r", 32 * 2)
      .transition()
        .attr("r", 32)
        .attr("fill", d3.schemeCategory10[d.index % 10]);
  }

  static dragstarted() {
    SingletonFlowchart.clicked = true
    d3.select(`#${SingletonFlowchart.selected}`).attr("stroke",null)
    SingletonFlowchart.selected = this.id

    d3.select(this)
      .attr("stroke", "black")
      .attr("cursor", "grabbing")
  }

  static dragged(event, d) {
    SingletonFlowchart.clicked = false
    d3.select(this).raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
  }

  static dragended() {
    this.cursor = "grab"
    d3.select(this)
      .attr("cursor", "grab")
  }
}
