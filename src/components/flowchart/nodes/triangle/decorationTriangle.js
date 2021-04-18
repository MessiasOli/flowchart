import { DecorationModel } from "../_model/DecorationModel";
import { ControllerTriangle } from "../triangle/controllerTriangle"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

export class DecorationTriangle extends DecorationModel {
  constructor() {
    super("DecorationTriangle")
    this.node = null;
    this.ctr = new ControllerTriangle();
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      this.node = newNode
  
      let triangle = d3.symbol().type(d3.symbolTriangle).size(newNode.size);
      await svg
        .data([newNode])
        .append("g")
          .attr("id", `${newNode.idName}`)
          .append("path")
            .classed("Triangle", true)
            .attr("cursor", "pointer")
            .attr("d", triangle)
            .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
            .style("fill", d => d.color)
            .on("dblclick", () => openDialog(newNode))
            .call(this.setDrag())

      return svg
    }
  
    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", this.dragstarted)
        .on("drag",(event,d) => this.dragged(event, d, that))
        .on("end", this.dragended);
      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`${d.idName}`)
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragged = function (event, d,that){
      d.x = event.x;
      d.y = event.y;
      that.move();
    } 

    this.move = () => {
      let d = this.node;

      d3.select(`#${d.idName} > path`)
      .raise()
      .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
    }

    this.dragended = function(event, d) {
      d3.select(`#${d.idName} > path`)
        .style("stroke", 'none')
        .attr("cursor", "pointer")
    };

    this.update = function() {
      let d = this.node;
      let triangle = d3.symbol().type(d3.symbolTriangle).size(d.size);

      d3.select(`#${d.idName} > path`)
        .style("stroke", 'none')
        .attr("cursor", "pointer")
        .attr("d", triangle)
        .attr("transform", `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
        .style("fill", d.color)
    }
  }
}