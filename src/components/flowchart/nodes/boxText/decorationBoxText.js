import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationBoxText extends DecorationModel {
  constructor() {
    super("DecorationBoxText")
    console.log("DecorationBoxText Criado!");
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
      console.log("node :>> ", node);
  
       await svg
          .data([node])
          .append("rect")
          .classed("BoxText", true)
          .attr("id", `BoxText-${node.id}`)
          .attr("x",  d => d.x)
          .attr("y", d => d.y)
          .attr("cursor", "grab")
          .attr("stroke", "#444")
          .call(this.setDrag(node))
      
      return svg
    }
  
    this.setDrag = function() {
      let that = this
      console.log('this :>> ', this);
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", that.dragended);
      return drag;
    }

    this.dragstarted = function() {
      SingletonFlowchart.clicked = true
      d3.select(`#${SingletonFlowchart.selected}`).attr("stroke",null)
      SingletonFlowchart.selected = this.id
  
      d3.select(this)
        .attr("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("cursor", "grab")
    };
  }
}

export { DecorationBoxText }