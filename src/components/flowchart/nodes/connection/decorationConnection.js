import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationConnection extends DecorationModel {
  constructor() {
    super("DecorationConnection")
    this.node = null
    this.svg
  
    this.init = async function (node) {
      this.svg = d3.select(node.parentId)
      this.node = node

        this.svg
          .selectAll(`.circle-${node.id}`)
          .data([{ x:node.x1, y: node.y1, id: node.id, node: this.node }])
          .join("circle")
          .attr("id", `dot-${node.id}`)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr("cursor", "pointer")
          .attr('r', 4)
          .node();

      if(node.path){
        this.changePath(node.path)
      }
      
      return this.svg
    }
    
    this.changePath = async function(line) {
      let id = this.node.id
      d3.selectAll(`#dot-${id}`).remove()

      // Primeiro ponto
      await this.createDot({
        id: id, 
        x: this.node.x1, 
        y: this.node.y1, 
        node: this.node 
      }).node()

      // Reta
      await this.svg
      .append("path")
      .classed("Connection", true)
      .attr("id", `dot-${id}`)
      .attr("d", line)
      .attr("stroke", this.node.color)
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .style("fill", "none")
      .on("click", ()=>{SingletonFlowchart.selected = 'dot-'+id})
      .on("dblclick", (event, d) => this.createBreakPoint(event, d, id))
      .node();

      if(this.node.internalPoints.length > 0){
        await this.createDot({
          id: id, 
          x: this.node.internalPoints[0].x, 
          y: this.node.internalPoints[0].y, 
          node: this.node 
        }).call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag",(event, d) => this.dragged(event, d, 1)))
      }

      if(this.node.internalPoints.length > 1){
        await this.createDot({
          id: id,
          x: this.node.internalPoints[1].x, 
          y: this.node.internalPoints[1].y, 
          node: this.node 
        }).call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag",(event, d) => this.dragged(event, d, 2)))
      }

      // Segundo ponto
      this.createDot({
        id: id,
        x: this.node.x2, 
        y: this.node.y2, 
        node: this.node 
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
        .attr('r', d => d.node.r)
    }

    this.createBreakPoint = function(event, d, id){
      SingletonFlowchart.clicked = true
      SingletonFlowchart.selected = 'dot-'+this.node.id
      let connClicked = d.connectionPack.filter(conections => conections.conn.id == id)[0]
      let line = connClicked.conn.path;
      
      if (connClicked.conn.qtdInternalPoints == 2) 
        return
      
      ++connClicked.conn.qtdInternalPoints;
      this.createDot({
        id: id,
        x: event.offsetX, 
        y: event.offsetY, 
        node: this.node 
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
        d.node.moveLastPoint({x: event.x, y: event.y})
      }else{
        d.node.pointOnPath({x: event.x, y: event.y}, dot)
      }
    }

    this.move = async (line) => {
      await this.changePath(line);
    }

    this.createSelectorArea = function (){
      let parent = SingletonFlowchart.selectedNodes.filter(n => n.idName == this.node.parentId.replace("#", ""));
      console.log('Entrei :>> ', parent);
      if(parent.length > 0){
        this.boxSelection.initSelection(this.node);
      }
    }

    this.draggedNewBreakPoint = async function(event, d, dot) {
      SingletonFlowchart.clicked = false
      d.node.pointOnPath({x: event.x, y: event.y}, dot)
    }
  }
}

export { DecorationConnection }