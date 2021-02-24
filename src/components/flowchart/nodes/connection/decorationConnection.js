import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationConnection extends DecorationModel {
  constructor() {
    super("DecorationBoxText")
    console.log("DecorationBoxText Criado!");
    this.dotP1 = { x: 0, y:0 }
    this.connectionNode = null
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
      this.connectionNode = node

        svg
          .selectAll(`.circle-${node.id}`)
          .data([{ x:node.x, y: node.y, id: node.id, node: this.connectionNode }])
          .join("circle")
          .attr("id", `dot-${node.id}`)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr("cursor", "pointer")
          .attr('r', 4)
      
      return svg
    }
    
    this.move = function(line) {
      let id = this.connectionNode.id

      d3.selectAll(`#Connection-${id}`).remove()
      d3.selectAll(`#dot-${id}`).remove()
      
      // Primeiro ponto
      SingletonFlowchart.svg
        .selectAll(`.any`)
        .data([{  
          id: id, 
          x: this.connectionNode.x, 
          y: this.connectionNode.y, 
          node: this.connectionNode 
        }])
        .join("circle")
        .attr("id", `dot-${id}`)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("cursor", "pointer")
        .attr('r', 4)
        .node()

      // Reta
      SingletonFlowchart.svg
        .append("path")
        .classed("Connection", true)
        .attr("id", `Connection-${id}`)
        .attr("d", line)
        .attr("stroke", "#444")
        .attr("stroke-width", 3).node();
      
      // Segundo ponto
      SingletonFlowchart.svg
        .selectAll(`.any`)
        .data([{  
          id: id, 
          x: this.connectionNode.x1, 
          y: this.connectionNode.y1, 
          node: this.connectionNode 
        }])
        .join("circle")
        .attr("id", `dot-${id}`)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("cursor", "pointer")
        .attr('r', 4)
        .call(this.setDrag())
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

    this.dragstarted = function(event, d) {
      SingletonFlowchart.clicked = true
      SingletonFlowchart.selected = d.id
    }
  
    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false
      d.node.x1 = event.x
      d.node.y1 = event.y
      d.node.path = `M${ d.node.x },${ d.node.y }L${ d.node.x1 },${ d.node.y1 }`

      d3.select(this).raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
      d.node.decorator.move(d.node.path)
    }
  }
}

export { DecorationConnection }