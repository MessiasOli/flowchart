import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationConnection extends DecorationModel {
  constructor() {
    super("DecorationBoxText")
    console.log("DecorationBoxText Criado!");
    this.connectionNode = null
    this.svg
  
    this.init = async function (node) {
      this.svg = d3.select(node.parentId)
      this.connectionNode = node
      console.log('node :>> ', node);
        this.svg
          .selectAll(`.circle-${node.id}`)
          .data([{ x:node.x, y: node.y, id: node.id, node: this.connectionNode }])
          .join("circle")
          .attr("id", `dot-${node.id}`)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr("cursor", "pointer")
          .attr('r', 4)
      
      return this.svg
    }
    
    this.move = function(line) {
      let id = this.connectionNode.id

      d3.selectAll(`#dot-${id}`).remove()
      // Primeiro ponto
      this.createDot({
        id: id, 
        x: this.connectionNode.x, 
        y: this.connectionNode.y, 
        node: this.connectionNode 
      }).node()

      // Reta
        this.svg
        .append("path")
        .classed("Connection", true)
        .attr("id", `dot-${id}`)
        .attr("d", line)
        .attr("stroke", this.connectionNode.color)
        .attr("stroke-width", 3)
        .style("cursor", "pointer")
        .style("fill", "none")
        .on("click", ()=>{SingletonFlowchart.selected = 'dot-'+id})
        .on("dblclick", (event, d) => this.createBreakPoint(event, d, id))
        .node();

        if(this.connectionNode.internalPoints.length > 0){
          this.createDot({
            id: id, 
            x: this.connectionNode.internalPoints[0].x, 
            y: this.connectionNode.internalPoints[0].y, 
            node: this.connectionNode 
          }).call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag",(event, d) => this.dragged(event, d, 1)))
        }

        if(this.connectionNode.internalPoints.length > 1){
          this.createDot({
            id: id,
            x: this.connectionNode.internalPoints[1].x, 
            y: this.connectionNode.internalPoints[1].y, 
            node: this.connectionNode 
          }).call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag",(event, d) => this.dragged(event, d, 2)))
        }

      // Segundo ponto
      this.createDot({
        id: id,
        x: this.connectionNode.x1, 
        y: this.connectionNode.y1, 
        node: this.connectionNode 
      }).call(this.setDrag())
        .node()
    }

    this.createDot = function(coordinate){
      return this.svg
        .selectAll(`.any`)
        .data([coordinate])
        .join("circle")
        .attr("id", d => `dot-${d.id}`)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("cursor", "pointer")
        .attr('r', 4)
    }

    this.createBreakPoint = function(event, d, id){
      SingletonFlowchart.clicked = true
      SingletonFlowchart.selected = 'dot-'+this.connectionNode.id
      let connClicked = d.connectionPack.filter(conections => conections.conn.id == id)[0]
      let line = connClicked.conn.path;
      
      if (connClicked.conn.qtdInternalPoints == 2) 
        return
      
      ++connClicked.conn.qtdInternalPoints;
      this.createDot({
        id: id,
        x: event.offsetX, 
        y: event.offsetY, 
        node: this.connectionNode 
      }).call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", (event, d) => this.draggedNewBreakPoint(event, d, connClicked.conn.qtdInternalPoints))
      )
        .node()

      connClicked.conn.path = line
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

    this.dragstarted = async function(event, d) {
      SingletonFlowchart.selectNode('dot-' + d.id)
    }
  
    this.dragged = function(event, d, dot) {
      SingletonFlowchart.clicked = false

      if(!dot){
        console.log("Entrada 1")
        d.node.moveLastPoint({x: event.x, y: event.y})
      }else{
        console.log("Entrada 2")
        d.node.pointOnPath({x: event.x, y: event.y}, dot)
      }
    }

    this.draggedNewBreakPoint = async function(event, d, dot) {
      SingletonFlowchart.clicked = false
      d.node.pointOnPath({x: event.x, y: event.y}, dot)
    }
  }
}

export { DecorationConnection }