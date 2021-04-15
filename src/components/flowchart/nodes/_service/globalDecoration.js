/* eslint-disable no-unused-vars */
import { SingletonFlowchart } from "./singletonFlowchart"
import { GetCoordinateDiff } from "../../utils/tools"
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
        .classed("SelectionNode", true)
        .append("rect")
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
      let drag = d3
        .drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended);
      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`Box-${d.id}`)

      d3.selectAll(".SelectionNode")
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragged = async function (event,n){
      try {
        let coord = GetCoordinateDiff(event, n)

        await SingletonFlowchart.selectedNodes.forEach(async d => {
          d.x += coord.x;
          d.y += coord.y;
          await d.move();
          await d3.select(`#Selected-${d.id} > rect`)
            .raise()
            .attr("x", d.x)
            .attr("y", d.y)
            .node();
        });
      }
      catch (e)
      {
        throw "Classe BoxSelection, método: dragged\nErro: " + e
      }
    };

    this.dragended = function() {
      d3.selectAll(".SelectionNode")
        .style("stroke", 'none')
        .attr("cursor", "grab")
    };
    SingletonFlowchart.SaveStatus();
  }
}

export const RemoveSelectionNodes = () => {
  d3.selectAll(".SelectionNode").remove();
  SingletonFlowchart.unSelectNode();
}