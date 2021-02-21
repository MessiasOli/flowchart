import { IDecoration } from "../_interface/IDecoration";
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import * as d3 from "d3"

export class DecorationBoxText {
  constructor() {
    IDecoration.Decoration.apply(this, ["DecorationBoxText"]);
    console.log("Decoration Criado!");
  }

  static async init(node) {
    let svg = SingletonFlowchart.svg
    console.log("node :>> ", node);

     await svg
        .data([node])
        .append("rect")
        .classed("BoxText", true)
        .attr("id", `BoxText-${node.id}`)
        .attr("x",  d => d.x)
        .attr("y", d => d.y)
        .attr("stroke", "#444")
        .call(this.setDrag(node))
    
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

  static dragstarted() {
    d3.select(this).attr("stroke", "black");
  }

  static dragged(event, d) {
    d3.select(this).raise().attr("x", d.x = event.x).attr("y", d.y = event.y);
  }

  static dragended() {
    d3.select(this).attr("stroke", null);
  }
}
