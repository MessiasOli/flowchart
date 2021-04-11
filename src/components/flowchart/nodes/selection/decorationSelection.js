import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationSelection extends DecorationModel {
  constructor() {
    super("DecorationSelection")
    this.node = null;
  
    this.init = async function (newNode) {
      this.node = newNode;
      this.renderSquare();
    }

    this.renderSquare = async function () {
      this.removeSquare();

      let svg = SingletonFlowchart.svg
      await svg
          .data([this.node])
          .append("rect")
          .attr("id", `Selection-${this.node.id}`)
          .attr("x", this.node.getX())
          .attr("y", this.node.getY())
          .style("width", this.node.width)
          .style("height", this.node.height)
          .style("stroke", "#000")
          .style("stroke-width", 1,5)
          .style("stroke-dasharray", ("5, 3"))
          .style("fill", COLORS.ClearBlue10)
          .node();
    }

    this.removeSquare = async function(){
      d3.select(`#Selection-${this.node.id}`).remove();
    }
  }
}