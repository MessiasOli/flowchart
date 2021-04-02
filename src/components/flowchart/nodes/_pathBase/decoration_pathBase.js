import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class Decoration_pathBase extends DecorationModel {
  constructor() {
    super("Decoration_pathBase")
    console.log("Decoration_pathBase Criado!");
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
      console.log("node :>> ", node);
  
       await svg
          .data([node])
          .append("g")
          .attr("id", `Area-${node.id}`)
          .append("rect")
          .classed("_pathBase", true)
          .attr("id", `_pathBase-${node.id}`)
          .attr("x",  d => d.x)
          .attr("y", d => d.y)
          .style("width", node.width)
          .style("height", node.height)
          .attr("cursor", "grab")
          .style("fill", COLORS.ClearBlue)
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

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selected && d3.select(`#${SingletonFlowchart.selected}`).attr("stroke",null)
      SingletonFlowchart.selectNode(`_pathBase-${d.id}`)
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    // this.dragged = async function (event, d){
      /* use inheritance or overwrite */
    // }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .style("stroke", 'none')
        .attr("cursor", "grab")
    };
  }
}