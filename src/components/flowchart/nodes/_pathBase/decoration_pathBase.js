import { DecorationModel } from "../_model/DecorationModel";
import { Controller_pathBase } from "../_pathBase/controller_pathBase"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class Decoration_pathBase extends DecorationModel {
  constructor() {
    super("Decoration_pathBase")
    this.node = null;
    this.ctr = new Controller_pathBase();
  
    this.init = async function (newNode) {
      let svg = SingletonFlowchart.svg
      this.node = newNode
  
       await svg
          .data([newNode])
          .append("g")
          .attr("id", `${newNode.idName}`)
          .append("rect")
          .classed("_pathBase", true)
          .attr("x",  d => d.x)
          .attr("y", d => d.y)
          .style("width", newNode.width)
          .style("height", newNode.height)
          .attr("cursor", "grab")
          .style("fill", COLORS.ClearBlue)
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
      SingletonFlowchart.selectNode(`${d.idName}`)
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    /* - to override
    this.dragged = async function (event, d){
      
      d.x = event.x;
      d.y = event.y;

      d3.select(this)
        .raise()
        .attr("x", d.x)
        .attr("y", d.y)
    } 
    */

    this.dragended = function(d) {
      d3.select(`#${d.idName}`)
        .style("stroke", 'none')
        .attr("cursor", "grab")
    };
  }
}