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
            .attr("x", newNode.xImg)
            .attr("y", newNode.yImg)
            .attr("xlink:href", newNode.srcImg)
            .attr("cursor", "grab")
            .call(this.setDrag())
            .on('dblclick', () => openDialog(newNode))
            .node();

          g.append('text')
          .attr("y", (d) => d.y + newNode.heightText)
          .attr("x", newNode.xText())
          .attr("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style('stoke', COLORS.Black90)
          .text(newNode.value)
          .on('dblclick', () => openDialog(newNode))
          .node();

          g.append("rect")
          .classed("InputBox", true)
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .attr("stroke", COLORS.ClearBlue)
          .style("fill", '#0000')
          .style("width", newNode.width)
          .style("height", newNode.height)
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
      SingletonFlowchart.selectNode(`#InputBox-${d.id}`);
      d3.select(this).attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d) {
      const adjust = 5;
      d.x = event.x - adjust;
      d.y = event.y - adjust;
      SingletonFlowchart.clicked = false;

      await d3.select(this)
              .raise()
              .attr("x", (d.xImg = event.x - 12 - adjust))
              .attr("y", (d.yImg = event.y - 92));

      await d3.select(`#InputBox-${d.id} > rect`)
              .raise()
              .attr("x", d.x)
              .attr("y", d.y);

      await d3.select(`#InputBox-${d.id} > text`)
              .raise()
              .attr("x", d.xText())
              .attr("y", (d.y + d.heightText));

      await d3.select(`#InputBox-${d.id} > circle`)
              .raise()
              .attr("cx", d.xDot())
              .attr("cy", d.yDot());

      d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
      d.connectionPack.forEach(point => point.conn.moveFirstPoint({x: d.xDot(), y: d.yDot()}));
    }

    this.dragended = function() {
      d3.select(this)
        .attr("stroke", COLORS.ClearBlue)
        .attr("cursor", "grab") 
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
      that.transientConnection.startMoveConnection({ x: event.x + 71.3, y: event.y - 1.5})
    }

    this.dragendedCircle = (event, that, node) =>{
      !that.connected && that.node.connectionPack.push({ conn: that.transientConnection, dot: node.point })
      that.transientConnection = null;
    }

    this.setTextAndAdjustWidth = () => {
      d3.select(`#InputBox-${this.node.id} > text`)
        .attr("x", this.node.xText() - 5)
        .text(this.node.value)
        .node()

      d3.select(`#InputBox-${this.node.id} > rect`)
        .style("width", this.node.width)
    }
  }
}