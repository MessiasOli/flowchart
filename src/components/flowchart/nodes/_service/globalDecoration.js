/* eslint-disable no-unused-vars */
import { SingletonFlowchart } from "./singletonFlowchart"
import { COLORS } from "../../utils/colors"
import * as d3 from "d3";

export class BoxSelection {
  constructor() {
    let svg = SingletonFlowchart.svg

    this.initSelection = async function (nodeRef) {
    await svg
        .data([nodeRef])
        .append("g")
        .attr("id", d => `Selected-${d.id}`)
        .append("rect")
        .classed("Box", true)
        .attr("x",  d => d.x)
        .attr("y", d => d.y)
        .style("width", d => d.width)
        .style("height", d => d.height)
        .attr("cursor", "grab")
        .style("fill", COLORS.ClearBlue50)
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
      SingletonFlowchart.selectNode(`Box-${d.id}`)

      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d){
      
      d.x = event.x;
      d.y = event.y;
      d.move();
      
      d3.select(this)
        .raise()
        .attr("x", d.x)
        .attr("y", d.y)
    };

    this.dragended = function(d, that) {
      this.cursor = "grab"
      d3.select(`#${d.idName}`)
        .style("stroke", 'none')
        .attr("cursor", "grab")

    };

    this.finishSelection = function(nodeRef){

    }
  }
}