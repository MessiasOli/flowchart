import { DecorationModel } from "../_model/DecorationModel";
import { ControllerConnection } from "../connection/controllerConnection"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
//import { GetSVGCoordinates } from "../../utils/tools"
import * as d3 from "d3"

export class DecorationInputBox extends DecorationModel {
  constructor() {
    super("DecorationInputBox")
    this.node = null;
    this.busyConnection = false;
    this.ctrConnection = new ControllerConnection()
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      this.node = newNode;
  
       await svg
          .data([newNode])
          .append("g")
          .classed("InputBox", true)
          .attr("id", `InputBox-${newNode.id}`)

          let g = d3.select(`#InputBox-${newNode.id}`)

          g.append("image")
            .attr('width', newNode.widthImg)
            .attr('height', newNode.heightImg)
            .attr("x", newNode.x)
            .attr("y", newNode.y)
            .attr("xlink:href", newNode.srcImg)
            .attr("cursor", "grab")
            .call(this.setDrag())
            .on('dblclick', () => openDialog(newNode))
            .node();

          g.append('text')
          .attr("y", d => d.yText())
          .attr("x", d => d.xText())
          .attr("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style('stoke', COLORS.Black90)
          .text(newNode.value)
          .on('dblclick', () => openDialog(newNode))
          .node();

          g.append("rect")
          .classed("InputBox", true)
          .attr("x", (d) => d.xRect())
          .attr("y", (d) => d.yRect())
          .attr("stroke", COLORS.ClearBlue)
          .style("fill", '#0000')
          .style("width", newNode.widthRect)
          .style("height", newNode.heightRect)
          .node();
          
          g.append('circle')
            .attr("cx", newNode.xDot())
            .attr("cy", newNode.yDot())
            .attr("r", 4)
            .attr("id", 'dot-'+ newNode.id)
            .attr("cursor", "pointer")
            .style("fill", COLORS.CornflowerBlue)
            .call(this.setDragCircle(newNode))
            .node();

          this.createConnectionPath(newNode)
      return svg
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
      SingletonFlowchart.selectNode(`${d.idName}`);
      d3.select(this).attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d) {
      // const adjust = 5;
      d.x = event.x;
      d.y = event.y;
      SingletonFlowchart.clicked = false;

      await d3.select(this)
              .raise()
              .attr("x", d.x)
              .attr("y", d.y);

      await d3.select(`#InputBox-${d.id} > rect`)
              .raise()
              .attr("x", d.xRect())
              .attr("y", d.yRect());

      await d3.select(`#InputBox-${d.id} > text`)
              .raise()
              .attr("x", d.xText())
              .attr("y", d.yText());

      await d3.select(`#InputBox-${d.id} > circle`)
              .raise()
              .attr("cx", d.xDot())
              .attr("cy", d.yDot());

      d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
      d.connectionPack.forEach(point => point.conn.moveFirstPoint({x: d.xDot(), y: d.yDot()}));
    }

    this.move = async () => {
      let d = this.node;

      await d3.select(`#${d.idName} > image`)
      .raise()
      .attr("x", d.x)
      .attr("y", d.y);

      await d3.select(`#InputBox-${d.id} > rect`)
            .raise()
            .attr("x", d.xRect())
            .attr("y", d.yRect());

      await d3.select(`#InputBox-${d.id} > text`)
            .raise()
            .attr("x", d.xText())
            .attr("y", d.yText());

      await d3.select(`#InputBox-${d.id} > circle`)
            .raise()
            .attr("cx", d.xDot())
            .attr("cy", d.yDot());

      let conn = new Array();
      await SingletonFlowchart.selectedNodes.forEach(n => {
        if(this.typeConn == n.type){
          conn.push(n)
        }
      });

      if(d.connectionPack.length > 0){
        d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
        d.connectionPack.forEach(point => {
          let isSelected = conn.includes(point.conn)
          if(!isSelected){
            let dot = d.decorator.getPointPosition(d, point.dot)
            point.conn.moveFirstPoint({x: dot[0].x, y: dot[0].y})
          }
        });
      }
    }

    this.dragended = function() {
      d3.select(this)
        .attr("stroke", COLORS.ClearBlue)
        .attr("cursor", "grab") 

      SingletonFlowchart.SaveStatus();
    };

    this.setDragCircle = function(node){
      let that = this
      
      let drag = d3
        .drag()
        .on("start", () => that.conected = true)
        .on("drag", (event) => that.draggedCircle(event, that, node))
        .on("end", (event, node) => that.dragendedCircle(event, that, node));

      return drag;
    }

    this.draggedCircle = (event, that, node) =>{
      if(that.conected && !that.transientConnection){
        that.transientConnection = that.ctrConnection.setNewNode(
          node.xDot(), 
          node.yDot(), 
          `#InputBox-${node.id}`,
          COLORS.CornflowerBlue
        )
      }

      that.conected = false;
      that.transientConnection.startMoveConnection({ x: node.xDot(event), y: node.yDot(event)})
    }

    this.dragendedCircle = (event, that, node) =>{
      !that.connected && that.node.connectionPack.push({ conn: that.transientConnection, dot: node.point })
      that.transientConnection = null;
      SingletonFlowchart.SaveStatus();
    }

    this.setTextAndAdjustWidth = () => {
      d3.select(`#InputBox-${this.node.id} > text`)
        .attr("x", this.node.xText())
        .text(this.node.value)
        .node()

      d3.select(`#InputBox-${this.node.id} > rect`)
        .style("width", this.node.widthRect)
    }
  }
}